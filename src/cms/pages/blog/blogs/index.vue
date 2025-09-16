<template>
	<div class="blogs">
		<div class="actions">
			<el-button type="primary" :icon="Edit" circle @click="() => $router.push('/blog/new')" />
			<!-- <el-button type="primary" @click="() => (uploadDialogVisible = true)">上传本地文档</el-button> -->
			<el-button
				type="primary"
				@click="
					() => {
						formDialogVisible = true;
						renderData.form.url = '';
						renderData.form.title = '';
					}
				"
			>
				填写在线链接
			</el-button>
		</div>

		<el-form status-icon ref="tableFormRef" :model="renderData.form" :rules="rules">
			<el-table border style="width: 100%" pagination max-height="500" :data="renderData.value" :row-class-name="tableRowClassName">
				<el-table-column #default="scope" fixed="left" :label="null" width="80" align="center">
					<template v-if="modify && activeKey === scope.$index">
						<el-button type="warning" circle size="small" @click="() => handleEditEnd(scope)" :icon="Promotion" />
					</template>
					<template v-else>
						<el-button link type="warning" size="large" @click="() => handleStartEdit(scope)" :icon="Edit" />
					</template>
				</el-table-column>
				<el-table-column label="标题" #default="scope">
					<template v-if="modify && activeKey === scope.$index">
						<el-form-item :label="null" prop="title">
							<el-input v-model.trim="renderData.form.title" @blur="handleEditEnd(scope)" />
						</el-form-item>
					</template>
					<template v-else>
						<el-button link type="primary" @click.prevent="() => $router.push(`/blog/${scope.row.id}?home=/admin`)">{{ scope.row.title }}</el-button>
					</template>
				</el-table-column>
				<el-table-column label="原始文档地址" #default="scope">
					<template v-if="modify && activeKey === scope.$index">
						<el-form-item :label="null" prop="url">
							<el-input v-model.trim="renderData.form.url" @blur="handleEditEnd(scope)" />
						</el-form-item>
					</template>
					<template v-else>
						<span>{{ scope.row.url }}</span>
					</template>
				</el-table-column>
				<el-table-column #default="scope" label="更新时间">
					<span>{{ dayjs(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="180">
					<template #default="scope">
						<div class="table-actions">
							<el-button link type="primary" size="small" @click.prevent="() => $router.push(`/blog/${scope.row.id}/edit`)">编辑</el-button>
							<!-- <el-button link type="primary" size="small" @click.prevent="() => $router.push(`/blog/${scope.row.id}`)">预览</el-button> -->
							<template v-if="scope.row.isPublish">
								<el-button link type="danger" size="small" @click.prevent="modifyRow({ ...scope.row, isPublish: false })">撤回</el-button>
							</template>
							<template v-else>
								<el-button link type="primary" size="small" @click.prevent="modifyRow({ ...scope.row, isPublish: true })">发布</el-button>
							</template>
							<el-button link type="danger" size="small" @click.prevent="modifyRow({ ...scope.row, isDelete: true })">删除</el-button>
							<!-- <el-button link type="primary" size="small" @click.prevent="() => $router.push(`/blog/${scope.row.id}/edit`)">置顶</el-button> -->
						</div>
					</template>
				</el-table-column>
			</el-table>
		</el-form>

		<el-pagination
			background
			class="pagination"
			layout="prev, pager, next"
			:total="pagination.total"
			:page-size="pagination.pageSize"
			@change="
				(page: number) => {
					pagination.page = page;
					init();
				}
			"
		/>

		<el-dialog center width="500" :title="null" :show-close="false" v-model="uploadDialogVisible">
			<Uploader @complete="handleUploadComplete" />
		</el-dialog>

		<el-dialog center width="500" :title="null" :show-close="false" v-model="formDialogVisible" :close-on-click-modal="false">
			<el-form ref="dialogFormRef" :model="renderData.form" :rules="rules">
				<el-form-item label="标题:" label-width="100px" prop="title">
					<el-input v-model.trim="renderData.form.title" />
				</el-form-item>
				<el-form-item label-width="100px" prop="url">
					<template #label>
						<div class="form-item-label">
							<el-tooltip class="box-item" effect="dark" content="ps：请确保文档地址指向的是一个md文档的地址而不是网页" placement="top-start">
								<el-icon style="vertical-align: middle">
									<Warning class="icon" />
								</el-icon>
							</el-tooltip>
							文档地址:
						</div>
					</template>
					<div class="form-item-content">
						<el-input v-model.trim="renderData.form.url" />
						<el-tooltip class="box-item" effect="dark" content="点击自动填入标题" placement="top">
							<el-button
								:icon="Refresh"
								type="primary"
								@click="
									() => {
										const title = renderData.form.url.split('/').pop()?.replace('.md', '') ?? '';
										if (title) renderData.form.title = title;
									}
								"
							/>
						</el-tooltip>
					</div>
				</el-form-item>
			</el-form>
			<div class="button-wrapper">
				<el-button type="primary" @click="handleNewItem">提交</el-button>
				<el-button @click="() => dialogFormRef?.resetFields()">重置</el-button>
				<el-button @click="formDialogVisible = false">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import axios from '@/network';
import { Uploader } from '@/components';
import { Edit, Warning, Promotion, Refresh } from '@element-plus/icons-vue';
import { onMounted, reactive, ref, computed, watch } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';

type TBlog = {
	id: number;
	title: string;
	url: string;
	html: string;
	markdown: string;
	isDelete: boolean;
	isPublish: boolean;
	createTime: string;
	updateTime: string;
};

const tableFormRef = ref<FormInstance>();
const dialogFormRef = ref<FormInstance>();
const formDialogVisible = ref(false);
const uploadDialogVisible = ref(false);

const renderData = reactive({
	value: [] as TBlog[],
	form: {
		title: '',
		url: ''
	}
});
const rules = {
	title: [
		{ required: true, message: '请输入标题', trigger: 'blur' }
		// { pattern: /^a-z$/, message: '', trigger: 'blur' }
	],
	url: [{ pattern: /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/, message: 'url地址格式不正确，请检查后重试', trigger: 'blur' }]
};

const pagination = reactive({
	total: 0,
	page: 1,
	pageSize: 10
});

const modify = ref(false);
const activeKey = ref(-1);

const handleStartEdit = (scope: any) => {
	modify.value = true;
	activeKey.value = scope.$index;
	renderData.form = scope.row;
};

// row编辑完成
const handleEditEnd = async (scope: { row: TBlog }) => {
	try {
		modify.value = false;
		activeKey.value = -1;
		await modifyRow({ ...scope.row, ...renderData.form });
		// 重置表单
		tableFormRef.value?.resetFields();
		ElMessage.success('修改完成！');
	} catch (err) {}
};

const handleUploadComplete = () => {
	uploadDialogVisible.value = false;
	init();
};

// 创建新记录
const handleNewItem = async () => {
	if (!tableFormRef.value) return;
	try {
		const valid = await dialogFormRef.value?.validate();
		if (valid) {
			await axios.post('/blog', {
				...renderData.form,
				isPublish: false
			});
			formDialogVisible.value = false;
			dialogFormRef.value?.resetFields();

			await init();
		}
	} catch (err) {
		console.log('校验失败，失败原因：', err);
	}
};

const modifyRow = async (row: any) => {
	const { id, ...rest } = row;

	await axios.post(`/blog/${id}`, rest);
	await init();
};

const init = async () => {
	const res = await axios.get<{ data: TBlog[]; total: number }>('/blog', {
		page: pagination.page,
		pageSize: pagination.pageSize
	});
	renderData.value = res.data;

	pagination.total = res.total;
};

const tableRowClassName = ({ row, rowIndex }: { row: TBlog; rowIndex: number }) => {
	if (rowIndex === activeKey.value) {
		return 'row-active';
	}
	return '';
};

watch(
	() => pagination.page,
	() => init()
);

onMounted(() => {
	init();
});
</script>

<style scoped lang="scss">
.blogs {
	font-size: 16px;
	text-align: center;

	.pagination {
		margin-top: 10px;
		justify-content: flex-end;
	}

	.button-wrapper {
		text-align: right;
	}

	.actions {
		margin: 10px 0;
		text-align: right;
	}

	.table-actions {
		display: flex;
		align-items: center;

		> * {
			margin: 0;
			padding: 0 6px;

			&:not(:last-child) {
				border-right: 1px solid #f1f1f1;
			}
		}
	}

	.form-item-label {
		display: flex;
		align-items: center;

		.icon {
			color: var(--el-color-primary);
		}
	}

	.form-item-content {
		width: 100%;
		display: flex;
	}

	// row-active在子组件（element-plus）中渲染，所以不在scoped的生效范围，使用深层选择器
	:deep {
		.row-active {
			background: var(--el-color-primary-light-7);
		}
	}
}
</style>
