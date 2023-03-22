import styled from 'styled-components'

export const RecommendWrapper = styled.div`
  > .recommend-content {
    display: flex;
    background-image: url(${require('@/assets/img/wrap-bg.png')});
    border: 1px solid #d3d3d3;

    > .left {
      padding: 20px;
      width: 730px;
    }

    > .right {
      margin-left: 1px;
      width: 249px;
    }
  }
`
