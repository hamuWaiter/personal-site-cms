<template>
	<div class="blog-edit">
		<MyMdEditor :markdown="editorData.markdown" @save="handleSave" placeholder="从这里开始吧~" />

		<template v-if="id === 'new'">
			<input type="file" ref="fileInput" @change="readFile" accept=".md" style="display: none" />
			<div class="actions"><el-button :icon="Upload" circle type="primary" @click="openFileDialog" /></div>
		</template>

		<el-dialog width="30%" :title="null" :z-index="10000" v-model="visible" :show-close="false">
			<div class="container">
				<span>给文章命个名吧~</span>
				<el-input v-model="title" />
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="visible = false">取消</el-button>
					<el-button
						type="primary"
						@click="
							() => {
								handleNewBlog();
								visible = false;
							}
						"
					>
						提交
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { Upload } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { MyMdEditor } from '@/components';
import { ElMessage } from 'element-plus';
import axios from '@/network';

const router = useRouter();
const title = ref('');
const editorData = ref({
	html: '',
	markdown: ''
});
const visible = ref(false);
const fileInput = ref(null);
const id = ref(useRoute().params.id ?? 'new');

const init = async () => {
	const { url, html, markdown } = await axios.get(`/blog/${id.value}`);

	if (html) {
		editorData.value.html = html;
		editorData.value.markdown = markdown;
	} else if (url) {
		editorData.value = await axios.post('/common/getMarkdownContent', { url });
	}
};

// 修改博客时，初始化博客
if (id.value !== 'new') init();

// 新增
const handleNewBlog = async () => {
	try {
		const { id } = await axios.post('/blog', {
			url: '',
			title: title.value,
			html: editorData.value.html,
			markdown: editorData.value.markdown,
			isDelete: true
		});

		id.value = id;
		ElMessage.success('保存成功');
	} catch (err) {
		ElMessage.error('保存失败，请稍后重试');
	}
};

// 修改
const handleSave = async res => {
	if (id.value === 'new') {
		editorData.value = res;
		return (visible.value = true);
	}

	try {
		const data = await axios.post(`/blog/${id.value}`, {
			html: res.html,
			markdown: res.markdown
		});
		ElMessage.success('保存成功');
	} catch (err) {
		ElMessage.error('保存失败，请稍后重试');
	}
};

// 打开上传md文件对话框
const openFileDialog = () => {
	fileInput.value?.click();
};
// 读取md内容
const readFile = event => {
	const file = event.target.files[0];
	if (file && file.name.endsWith('.md')) {
		const reader = new FileReader();
		// 2、文件读取完成后，设置编辑器内容
		reader.onload = e => {
			editorData.value.markdown = e.target.result;
		};
		// 1、以文本格式读取文件内容
		reader.readAsText(file);
	} else {
		console.log('请选择一个Markdown文件');
	}
	// 重置input value，允许再次选择同一文件时触发change事件
	event.target.value = '';
};
</script>

<style scoped lang="scss">
.actions {
	margin: 10px 0;
	padding: 10px;
	text-align: right;
	border-radius: 10px;
	background: #f1f1f1;
}
</style>
