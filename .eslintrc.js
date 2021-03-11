module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	"?extends": "插件 (根据项目实际情况安装自定义插件) ",
	extends: ["eslint:recommended", "plugin:react/recommended"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		indent: ["error", 4],
		"linebreak-style": ["error", "windows"],
		quotes: ["error", "single"],
		semi: ["error", "always"],
	},
};
