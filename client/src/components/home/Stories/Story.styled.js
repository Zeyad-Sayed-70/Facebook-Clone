import styled from 'styled-components'

export const SpecificStoryStyled = styled.div`
  .bg {
    width: 100%;
    height: calc(100vh - 4rem);
    position: relative;
    user-select: none;
    @media (max-width: 767px) {
      height: 100vh;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .bg_overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    color: #fff;
  }
  .close {
    height: 4rem;
    opacity: 0;
    transition: .3s;
    svg {
      font-size: 2rem;
    }
  }
  .user_info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-left: .5rem;
    opacity: 0;
    transition: .3s;
    span {
      display: block;
      /* mix-blend-mode: difference; */
    }
    span:nth-of-type(2) {
      font-size: .8rem;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
    .avatar {
      width: 45px;
      height: 45px;
    }
  }
  .timer {
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: #006ee61a;
    span {
      width: 0%;
      height: 10px;
      background-color: #0ca0f8;
      display: flex;
      animation-name: timer;
      animation-duration: 5s;
      animation-timing-function: linear;
    }
  }
  .left_arrow, .right_arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 70px;
    background-color: #33333317;
    opacity: 0;
    transition: .3s;
    svg {
      font-size: 2rem;
    }
    @media (max-width: 767px) {
      height: 50px;
      width: 50px;
      top: 90%;
      svg {
        font-size: 1.5rem;
      }
    }
  }
  &:hover .left_arrow {
    opacity: 1;
  }
  &:hover .right_arrow {
    opacity: 1;
  }
  &:hover .close {
    opacity: 1;
  }
  &:hover .user_info {
    opacity: 1;
  }
  .left_arrow:hover, .right_arrow:hover, .close:hover {
    background-color: #4242429c;
  }
  .left_arrow {
    left: 10px;
    svg {
      margin-left: 0.7rem;
    }
  }
  .right_arrow {
    right: 10px;
  }
  @keyframes timer {
    from {
      width: 0%;
    }
    to {
      width: 100%
    }
  }
`