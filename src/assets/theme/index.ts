const theme = {
  color: {
    primary: '#C20C0C',
    secondary: '',
  },
  fontSize: {},
  mixin: {
    singleTextDots: `
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `,
    mutilTextDots: `
      overflow:hidden;
      text-overflow: ellipsis;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:3;
    `,
  },
}

export default theme
