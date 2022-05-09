import App from '@/Views'
import { React, render, ROOT_NODE } from '@/config';

render(<App />, document.getElementById(ROOT_NODE) as HTMLElement);