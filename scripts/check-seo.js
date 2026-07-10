#!/usr/bin/env node

/**
 * SEO 配置检查脚本
 * 用于验证网站的 SEO 配置是否完整
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');
const distDir = path.join(__dirname, '..', 'dist');

console.log('🔍 开始检查 SEO 配置...\n');

const checks = {
  passed: [],
  failed: [],
  warnings: []
};

// 检查必需的文件
const requiredFiles = [
  { path: 'robots.txt', name: 'Robots.txt' },
  { path: 'humans.txt', name: 'Humans.txt' },
  { path: 'manifest.json', name: 'Web App Manifest' },
  { path: 'browserconfig.xml', name: 'Browser Config' },
  { path: '.well-known/security.txt', name: 'Security.txt' },
  { path: 'ads.txt', name: 'Ads.txt' }
];

// 构建产物中动态生成的文件（需先执行 pnpm build）
const requiredDistFiles = [
  { path: 'feed.xml', name: 'RSS Feed（动态生成）' },
  { path: 'llms.txt', name: 'llms.txt（GEO 索引）' },
  { path: 'llms-full.txt', name: 'llms-full.txt（GEO 全文）' },
  { path: 'sitemap-index.xml', name: 'Sitemap 索引' }
];

// 注意：
// - .well-known/change-password (已删除 - 仅用于有账号系统的网站)
// - google-site-verification.html (已删除 - 已通过 DNS CNAME 验证)

console.log('📁 检查必需文件...');
requiredFiles.forEach(file => {
  const filePath = path.join(publicDir, file.path);
  if (fs.existsSync(filePath)) {
    checks.passed.push(`✅ ${file.name} 存在`);
  } else {
    checks.failed.push(`❌ ${file.name} 缺失`);
  }
});

console.log('\n📦 检查构建产物（dist）...');
if (fs.existsSync(distDir)) {
  requiredDistFiles.forEach(file => {
    const filePath = path.join(distDir, file.path);
    if (fs.existsSync(filePath)) {
      checks.passed.push(`✅ ${file.name} 存在`);
    } else {
      checks.failed.push(`❌ ${file.name} 缺失（请先执行 pnpm build）`);
    }
  });
} else {
  checks.warnings.push('⚠️  dist 目录不存在，跳过构建产物检查（请先执行 pnpm build）');
}

// 检查图标文件
console.log('\n🖼️  检查图标文件...');
const iconFiles = [
  'favicon.ico',
  'favicon.svg',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'mstile-150x150.png',
  'safari-pinned-tab.svg'
];

iconFiles.forEach(icon => {
  const iconPath = path.join(publicDir, icon);
  if (fs.existsSync(iconPath)) {
    checks.passed.push(`✅ ${icon} 存在`);
  } else {
    checks.warnings.push(`⚠️  ${icon} 缺失（可选但推荐）`);
  }
});

// 检查配置文件内容
console.log('\n📄 检查配置文件内容...');

// 检查 robots.txt
const robotsPath = path.join(publicDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
  if (robotsContent.includes('Sitemap:')) {
    checks.passed.push('✅ robots.txt 包含 Sitemap 声明');
  } else {
    checks.warnings.push('⚠️  robots.txt 缺少 Sitemap 声明');
  }
  
  if (robotsContent.includes('User-agent: Googlebot')) {
    checks.passed.push('✅ robots.txt 配置了 Googlebot');
  }
  
  if (robotsContent.includes('User-agent: Baiduspider')) {
    checks.passed.push('✅ robots.txt 配置了 Baiduspider');
  }

  const aiBots = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'CCBot'];
  const missingAiBots = aiBots.filter(bot => !robotsContent.includes(`User-agent: ${bot}`));
  if (missingAiBots.length === 0) {
    checks.passed.push('✅ robots.txt 已放行主流 AI 爬虫（GEO）');
  } else {
    checks.warnings.push(`⚠️  robots.txt 缺少 AI 爬虫配置: ${missingAiBots.join(', ')}`);
  }
}

// 检查 manifest.json
const manifestPath = path.join(publicDir, 'manifest.json');
if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    
    if (manifest.name) checks.passed.push('✅ manifest.json 包含 name');
    if (manifest.short_name) checks.passed.push('✅ manifest.json 包含 short_name');
    if (manifest.description) checks.passed.push('✅ manifest.json 包含 description');
    if (manifest.icons && manifest.icons.length > 0) {
      checks.passed.push(`✅ manifest.json 包含 ${manifest.icons.length} 个图标`);
    }
    if (manifest.start_url) checks.passed.push('✅ manifest.json 包含 start_url');
    if (manifest.display) checks.passed.push('✅ manifest.json 包含 display');
    if (manifest.theme_color) checks.passed.push('✅ manifest.json 包含 theme_color');
    if (manifest.background_color) checks.passed.push('✅ manifest.json 包含 background_color');
    
  } catch (e) {
    checks.failed.push('❌ manifest.json 格式错误');
  }
}

// 检查 security.txt
const securityPath = path.join(publicDir, '.well-known', 'security.txt');
if (fs.existsSync(securityPath)) {
  const securityContent = fs.readFileSync(securityPath, 'utf-8');
  if (securityContent.includes('Contact:')) {
    checks.passed.push('✅ security.txt 包含联系方式');
  }
  if (securityContent.includes('Expires:')) {
    checks.passed.push('✅ security.txt 包含过期时间');
  }
}

// 检查 feed.xml（构建产物）
const feedPath = path.join(distDir, 'feed.xml');
if (fs.existsSync(feedPath)) {
  const feedContent = fs.readFileSync(feedPath, 'utf-8');
  if (feedContent.includes('<rss')) {
    checks.passed.push('✅ feed.xml 是有效的 RSS 格式');
  }
  if (feedContent.includes('xmlns:atom')) {
    checks.passed.push('✅ feed.xml 包含 Atom 命名空间');
  }
}

// 输出结果
console.log('\n' + '='.repeat(50));
console.log('📊 检查结果汇总');
console.log('='.repeat(50));

console.log(`\n✅ 通过项: ${checks.passed.length}`);
checks.passed.forEach(item => console.log(`  ${item}`));

if (checks.warnings.length > 0) {
  console.log(`\n⚠️  警告项: ${checks.warnings.length}`);
  checks.warnings.forEach(item => console.log(`  ${item}`));
}

if (checks.failed.length > 0) {
  console.log(`\n❌ 失败项: ${checks.failed.length}`);
  checks.failed.forEach(item => console.log(`  ${item}`));
}

console.log('\n' + '='.repeat(50));

// 总体评分
const total = checks.passed.length + checks.warnings.length + checks.failed.length;
const score = ((checks.passed.length + checks.warnings.length * 0.5) / total * 100).toFixed(1);

console.log(`\n🎯 SEO 配置评分: ${score}%`);

if (checks.failed.length === 0) {
  console.log('✨ 恭喜！所有必需的 SEO 配置都已完成！');
} else {
  console.log('💡 建议修复失败项以获得更好的 SEO 效果');
}

console.log('\n📚 详细文档: ./SEO-OPTIMIZATION.md\n');

// 退出代码
process.exit(checks.failed.length > 0 ? 1 : 0);
