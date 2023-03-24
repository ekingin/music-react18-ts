import styled from 'styled-components'

export const HotAnchorWrapper = styled.div`
  padding: 30px 20px 0;

  .hot-anchors {
    margin-top: 20px;

    .item {
      display: flex;
      margin-bottom: 10px;
      width: 210px;

      .info {
        width: 160px;
        margin-left: 8px;
        .name {
          color: #000;
          font-weight: 700;
          margin-top: 3px;
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }

        .position {
          color: #666;

          ${(props) => props.theme.mixin.singleTextDots}
        }
      }
    }
  }
`
