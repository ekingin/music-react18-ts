import styled from 'styled-components'

export const TopRankingItemWrapper = styled.div`
  width: 230px;
  &:last-child {
    width: 228px;
  }

  > .list-header {
    display: flex;
    padding: 20px 0 0 20px;
    height: 120px;

    .image {
      position: relative;
      width: 80px;
      height: 80px;

      .cover {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-position: -145px -57px;
      }
    }

    .info {
      flex: 1;
      margin: 6px 0 0 10px;

      .title {
        font-size: 14px;
        font-weight: 700;
        color: #333;
        ${(props) => props.theme.mixin.singleTextDots};

        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }

      .btn {
        display: inline-block;
        text-indent: -9999px;
        width: 22px;
        height: 22px;
        margin: 8px 10px 0 0;
        cursor: pointer;
      }

      .play {
        background-position: -267px -205px;

        &:hover {
          background-position: -267px -235px;
        }
      }

      .favor {
        background-position: -300px -205px;

        &:hover {
          background-position: -300px -235px;
        }
      }
    }
  }

  > .song-list {
    .item {
      position: relative;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      &:nth-of-type(-n + 3) {
        color: #c10d0c;
      }

      .index {
        width: 35px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 16px;
      }

      .info {
        color: #000;
        width: 180px;
        height: 17px;
        line-height: 17px;
        display: flex;
        justify-content: space-between;
        padding-right: 10px;

        .name {
          cursor: pointer;
          width: 103px;
          ${(props) => props.theme.mixin.singleTextDots};

          &:hover {
            text-decoration: underline;
          }
        }

        .operation {
          display: flex;
          align-items: center;
          display: none;

          .btn {
            width: 17px;
            height: 17px;
            cursor: pointer;
            &:nth-child(2) {
              margin: 0 8px;
            }
          }

          .play {
            background-position: -267px -268px;

            &:hover {
              background-position: -267px -288px;
            }
          }

          .addplay {
            position: relative;
            top: 2px;
            background-position: 1px -700px;

            &:hover {
              background-position: -21px -700px;
            }
          }

          .favor {
            background-position: -297px -268px;

            &:hover {
              background-position: -297px -288px;
            }
          }
        }
      }

      &:hover {
        .operation {
          display: inline-block;
        }
      }
    }
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 32px;
    padding-right: 20px;

    &:hover {
      text-decoration: underline;
    }
  }
`
