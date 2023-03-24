import styled from 'styled-components'

export const SignedArtistWrapper = styled.div`
  padding: 15px 20px;

  .artist-list {
    .artist-item {
      display: flex;
      height: 62px;
      margin-top: 14px;
      background-color: #fafafa;
      text-decoration: none;

      :hover {
        background-color: #f4f4f4;
      }

      .avatar {
        width: 62px;
        height: 62px;
        /* object-fit: cover; */
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 3px 12px;
        border: 1px solid #e9e9e9;
        border-left: none;
        overflow: hidden;

        .name {
          font-size: 14px;
          font-weight: 700;
          color: #000;
        }

        .alias {
          font-size: 12px;
          color: #666;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }

  .apply-for {
    margin-top: 12px;
    a {
      color: #333;
      font-weight: 700;
      text-align: center;
      display: block;
      line-height: 31px;
      border-radius: 4px;
      padding-right: 5px;
      background-position: right -100px;

      i {
        display: inline-block;
        height: 31px;
        width: 100%;
        background-position: 0 -59px;

        &:hover {
          background-position: 0 -141px;
        }
      }

      &:hover {
        background-position: right -182px;
      }
    }
  }
`
