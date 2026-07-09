#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd ./dist

# 将 _astro 构建产物平铺到 dist 根目录（GitHub Pages 托管兼容）
if [ -d _astro ]; then
  mv _astro/* ./
  rm -rf _astro
fi

# about 页面扁平化为根目录 about.html（与站内 /about 链接一致）
if [ -f about/index.html ]; then
  mv about/index.html about.html
  rmdir about 2>/dev/null || true
fi

# 重写所有 HTML 中的 /_astro 资源路径（含 /github/ 列表与详情页）
find . -name '*.html' -type f -print0 | while IFS= read -r -d '' file; do
  sed -i '' 's#/_astro##g' "$file"
done

# 如果是发布到自定义域名
echo 'niceshare.site' > CNAME

# 禁用 Jekyll，防止 _ 开头的构建产物（如 _slug_.xxx.css）被 GitHub Pages 忽略
touch .nojekyll

git init
git add -A
git commit -m '🎉 local build for deploy'

git push -f git@github.com:nicejade/homepage.git main:gh-pages
cd -