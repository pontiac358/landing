import {ARTICLE_SUPPORTED_LOCALES, ArticleSupportedLocale, Section} from '../types';

// Webpack require.context: auto-import all MDX files from content/ as raw strings
const ctx = require.context('./content', true, /\.mdx$/);

// Build content map: { locale -> { ComponentName -> content } }
const contentMap: Record<string, Record<string, string>> = {};

ctx.keys().forEach((key) => {
    const match = key.match(/^\.\/([^/]+)\/([^/]+)\.mdx$/);
    if (!match) return;

    const [, locale, name] = match;

    if (!contentMap[locale]) {
        contentMap[locale] = {};
    }

    const raw = ctx<string | {default: string}>(key);

    contentMap[locale][name] = typeof raw === 'string' ? raw : raw.default;
});

// Get localized content for a component, with fallback to 'en'
function getContent(componentName: string): Record<ArticleSupportedLocale, string> {
    const result = {} as Record<ArticleSupportedLocale, string>;

    for (const locale of ARTICLE_SUPPORTED_LOCALES) {
        result[locale] =
            contentMap[locale]?.[componentName] ?? contentMap['en']?.[componentName] ?? '';
    }

    return result;
}

// Convert PascalCase component name to kebab-case article id
function toKebabCase(name: string): string {
    return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Create an article entry from a PascalCase component name
function article(componentName: string) {
    return {
        id: toKebabCase(componentName),
        content: getContent(componentName),
    };
}

export const branding: Section = {
    id: 'branding',
    articles: [
        'Resources',
        'Basics',
        'Color',
        'Typography',
        'CornerRadius',
        'Branding',
        'GridAndContainer',
        'Module',
    ].map(article),
};

export const guides: Section = {
    id: 'guides',
    articles: [
        'ActionTooltip',
        'Alert',
        'Breadcrumbs',
        'Button',
        'Card',
        'ChangelogDialog',
        'Checkbox',
        'ClipboardButton',
        'Dialog',
        'DropdownMenu',
        'Hotkey',
        'Label',
        'Links',
        'ListItem',
        'Loader',
        'Pagination',
        'Popover',
        'Popup',
        'Progress',
        'Radio',
        'SegmentedRadioGroup',
        'RadioGroup',
        'Select',
        'Skeleton',
        'Spin',
        'Switch',
        'Table',
        'Tabs',
        'TextArea',
        'TextInput',
        'Toaster',
        'Tooltip',
        'User',
        'UserLabel',
    ].map(article),
};
