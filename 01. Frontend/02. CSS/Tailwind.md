# Tailwind

## Tailwind

- 유틸리티(utility) 클래스로 이루어진 CSS 프레임워크
- 추가적인 CSS 코드 작성없이 단순히 HTML 요소의 `class` 속성에 설정해주는 것만으로도 스타일링이 가능하다.

------

<br>

프로젝트 셋팅 시, tailwind 기본 셋팅만으로도 충분히 개발이 가능하지만, DX 및 양질의 코드를 위해 아래 셋팅들을 추가하였습니다.

<br>

## 프로젝트 적용 사항

- 디자인 시스템 반영
  - Color
  - Typography
- DX 개선
  - className 자동 정렬 - `prettier-plugin-tailwindcss` ([참고 자료](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier))
  - Arbitrary-Values 줄이기 줄이기 ([참고 자료](https://fe-developers.kakaoent.com/2022/220303-tailwind-tips/#arbitrary-values-줄이기))

<br>

> **Vscode Extension** `Tailwind CSS IntelliSense` 설치 시, tailwind classname 자동완성 기능을 사용할 수 있습니다. (저장 시마다 자동 적용은 VSCode 설정의 ‘Format On Save’ 활성화를 통해 가능합니다.)

------

<br>

## 1. Color

### 1.1. 상수화

프로젝트 디자인 시스템에서 제공되는 색상들의 이름과 동일한 형태로 적용할 수 있도록 색상들을 정의하고 관리하였습니다. (ex. `gray6` → `gray-6` ) 덕분에 사용할 색상의 hex color codes를 매번 확인하지 않고 쉽고 편리하게  관리할 수 있었습니다.

<br>

`tailwind.config.ts` 파일에서 theme의 colors 속성에 추가해주면 커스텀 색상 데이터를 사용할 수 있습니다.

```jsx
// 상수 파일
export const CUSTOM_COLORS = {
	gray: {
		'0': '#f8f9fa',
    '1': '#f1f3f5',
    ...
	},
	...
}
// tailwind.config.ts
...
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    ...
    extend: {
      colors: {
        ...CUSTOM_COLORS,
      },
    },
  },
};
// example
<div className="bg-gray-0 text-gray-1">
```

<br>

### 1.2. 자동 완성

색상 className 자동 완성 기능은 `Tailwind CSS IntelliSense` VSCode Extension만 설치되어 있다면, 별도의 셋팅 없이 사용 가능합니다.

![image](https://github.com/kanghyun98/TIL/assets/70627979/cfe9b879-e21e-4e5c-b746-9c056024d52d)

<br>

## 2. Typography

### 2.1. 상수화

tailwind에서 텍스트 스타일을 관리하는 방식에는 두가지가 있습니다. 첫번째는 개별 텍스트 속성을 정의하여 사용하는 방식이고, 두번째는 그룹화된 하나의 텍스트 스타일을 className으로 정의하여 사용하는 것 입니다.

저는 매번 직접 `font-size`, `font-weight` 등과 같은 텍스트 속성을 확인하면서 작업하는 첫번째 방식보다 두번째 방식이 개발 속도 및 편리성 측면에서 좋다고 판단하여 두번째 방식으로 사용할 수 있도록 작업하였습니다.

우선 저는 프로젝트 디자인 시스템에서 제공된 방식으로 텍스트 스타일을 상수로 정의하여 관리하였습니다. 제가 css 파일이 아닌 아래처럼 Object로 정의하여 관리하는 이유는 다음에 설명드리겠습니다.

```jsx
// 상수 파일
export const TEXT_STYLES = {
  '.display-1M': {
    'font-size': '56px',
    'font-style': 'normal',
    'font-weight': '500',
    'line-height': '68px',
    'letter-spacing': '-0.2px',
  },
  '.display-1R': {
    'font-size': '56px',
    'font-style': 'normal',
    'font-weight': '400',
    'line-height': '70px',
    'letter-spacing': '-0.2px',
  },
  ...
}
```

<br>

### 2.2. 자동 완성

tailwind에서 정의한 커스텀 텍스트 스타일을 className으로 사용하기 위해 CSS 파일을 사용한 방식도 있지만, 저는 **커스텀 플러그인 방식**으로 관리하였습니다. 그 이유는 CSS 파일 방식에서는 className 자동 완성 기능을 지원하지 않았기 때문입니다.

> 커스텀 플러그인에 대한 문서는 [공식문서](https://tailwindcss.com/docs/plugins) 참고 부탁드립니다.

```jsx
// src/plugins/textStyle.ts
import plugin from 'tailwindcss/plugin';
import { TEXT_STYLES } from '../constants/style';

export const TextStylePlugin = plugin(({ addUtilities }) => {
  addUtilities(TEXT_STYLES);
});
// tailwind.config.ts
import { TextStylePlugin } from './src/plugins/textStyle';
import type { Config } from 'tailwindcss';

const px_unit_1 = {} as Record<string, string>;
for (let i = 0; i < 1000; i++) px_unit_1[i] = `${i}px`;

const config: Config = {
  content: [
    ...
  ],
  theme: {
   ...
  },
  plugins: [TextStylePlugin],
};

export default config;
```

<br>

## 3. className 자동 정렬

tailwind를 이용한 스타일 적용 시, 매우 많은 className이 사용됩니다.

![image](https://github.com/kanghyun98/TIL/assets/70627979/804a6195-5335-4ca2-bcf5-f3ac13aca5c7)

<br>

그런데 여러명이서 동시에 작업할 때마다 className 순서를 제각각 다르게 사용한다면 코드가 깔끔해지기는 어렵겠죠. 그래서 사용한 것이 [`prettier-plugin-tailwindcss`](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) 라는 prettier plugin입니다.

<br>

이 플러그인을 활용하여 이제 className을 자동 정렬할 수 있습니다.

```json
// .prettierrc
{
	...,
	"plugins": ["prettier-plugin-tailwindcss"]
}
```

<br>

## 4. Arbitrary-Values 줄이기

Tailwind에서 스타일의 크기를 나타내는 숫자에 단위와 함께 사용하기 위해서는 대괄호로 감싸주어야 합니다. 그리고 Tailwind에서는 이를 [Arbitrary-Values](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values) 라고 부릅니다.

```jsx
// example
<div className="w-[120px] h-[100px] rounded-[5px]">
```

<br>

한두번 사용하는 것이라면 크게 불편하지 않지만, 서비스를 개발하면서 수백번씩 사용하다 보면 반복적으로 대괄호를 추가하고 단위를 작성하는 일이 피로감을 줄 수 있습니다. (더군다나 자동완성도 지원되지 않습니다!) 이러한 불편함을 해결하기 위해 ‘테마를 커스터마이징’하는 방법을 사용하였습니다. 정확히는 ‘**`px`**에 대한 프리셋을 전부 `extend`로 등록’하는 방법입니다.

방법은 다양하겠지만, 저는 ‘**범위**’와 ‘**단위**’를 분류하여 정의하였습니다. 이는 정답은 없으며, 상황에 맞게 만들어나가면 됩니다.

```tsx
import { TextStylePlugin, ScrollbarStylePlugin } from './src/plugins';
import { CUSTOM_COLORS } from './src/constants/style';

/** @type {import('tailwindcss').Config} */

type SizeType = Record<string, Record<string, Record<string, string>>>;

// 단위: 0.5, 1
// 범위: 0~10, 0~100, 0~1000, 0~1500
const size: SizeType = {
  'unit0.5': {
    max10: {},
  },
  unit1: {
    max100: {},
    max1000: {},
    max1500: {},
  },
}

for (let i = 0; i <= 1500; i++) {
  if (i <= 1500) size.unit1.max1500[i] = `${i}px`;
  if (i <= 1000) size.unit1.max1000[i] = `${i}px`;
  if (i <= 100) size.unit1.max100[i] = `${i}px`;
}

for (let i = 0; i <= 10; i += 0.5) {
  size['unit0.5'].max10[i] = `${i}px`;
}

module.exports = {
  ...
  theme: {
    extend: {
      ...
      spacing: size.unit1.max1500,
      maxWidth: size.unit1.max1500,
      minWidth: size.unit1.max1500,
      minHeight: size.unit1.max1500,
      borderWidth: size['unit0.5'].max10,
      borderRadius: size.unit1.max100,
    },
  },
};
```

> 참고 링크: https://fe-developers.kakaoent.com/2022/220303-tailwind-tips/#arbitrary-values-줄이기

------

<br>

## 후기

`css`, `scss`, `styled-component`, `emotion`, `vanilla-extract` 등 다양한 스타일 툴들을 사용해보았는데, tailwind가 그 중에서 DX 측면에서 최고의 경험을 제공해주었던 것 같습니다. class or component를 위한 별도의 네이밍과 파일 추가가 필요없다는 점이 가장 큰 이유였고, 추가적인 위의 셋팅들을 통해 매우매우 편리하게 스타일을 관리할 수 있어서 매우 만족스러웠습니다.

다른 새로운 프로젝트에서 또 사용할 것인지 물어보신다면, sure why not
