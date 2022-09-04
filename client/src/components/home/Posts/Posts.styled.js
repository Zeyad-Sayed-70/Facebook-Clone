import styled from 'styled-components'


export const PostStyled = styled.div`
  .create_container {
    background-color: #242526;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
  }
  .display_container {
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  hr {
    color: #fff;
  }
  .create_post_dialog {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #b0b3b8;
    .create_btn {
      padding: .5rem 1rem;
      background-color: #3A3B3C;
      cursor: pointer;
      flex: 1;
      border-radius: 50px;
    }
    .create_btn:hover {
      background-color: #4d4f50;
      color: #fff;
    }
  }
  .controllers {
    display: flex;
    button {
      flex: 1;
      color: #b0b3b8;
      span {
        margin-left: .5rem;
      }
    }
    button:hover {
      background-color: #3A3B3C;
      color: #fff;
    }
  }

`

export const FormDialogStyled = styled.div`
    background-color: #242526;
    color: #b0b3b8;
    border: 5px solid #242526;
    .close, .share {
        color: #fff;
        background-color: #b0b3b81f;
        &:hover {
            background-color: #b0b3b842;
        }
    }
    .emoji-picker-react {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 100;
    }
    .picker_overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 99
    }
    .user_info {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        div {
            display: flex;
            flex-direction: column;
            select {
                border: none;
                background-color: #333;
                color: #fff;
                width: 100px;
                border-radius: 50px;
                padding: .1rem .5rem;
                outline: none;
                margin-top: .5rem;
            }
        }
    }
    .textarea {
        position: relative;
        textarea {
            resize: none;
            width: 100%;
            min-height: 200px;
            outline: none;
            background: none;
            border: none;
            color: #b0b3b8;
            font-size: 1.3rem;
        }
        textarea::placeholder {
            font-size: 1.5rem;
        }
        .picker_btn {
            position: absolute;
            bottom: 10px;
            right: 10px;
            color: #b0b3b8;
            background-color: #242526;
        }
    }
    .data_types {
        padding: 0.5rem 0.8rem;
        border: 1px solid #7e7e7e;
        border-radius: 6px;
        display: flex;
        align-items: center;
        h6 {
            flex: 1;
            margin: 0;
            color: #fff;
        }
        button {
            svg {
                font-size: 1.8rem;
            } 
            &:first-of-type {
                color: #ffeb3b;
            }
            &:nth-of-type(2) {
                color: #4caf50;
            }
            &:last-of-type {
                color: #f44336;
            }
        }
    }
    .image_upload, .video_upload {
        padding-bottom: 1rem;
        h5 {
            margin-bottom: 1rem;
        }
        h6 {
            margin-top: 1rem;
        }
        input {
            margin-bottom: 1rem;
            width: 100%;
            min-height: 50px;
            outline: none;
            background: none;
            border: none;
            color: #b0b3b8;
            font-size: 1.3rem;
        }
        input::placeholder {
            font-size: 1.5rem;
        }
        & > div {
            position: relative;
            .picker_btn {
                position: absolute;
                top: 39%;
                right: -7px;
                transform: translateY(-50%);
                color: #b0b3b8;
                background-color: #242526;
            }
        }
    }
    .preview {
        img {
            width: 100%;
            object-fit: cover;
        }
        video {
            width: 100%;
        }
    }
    .sc-crXcEl {
        width: 100%;
        max-width: auto;
        min-width: auto;
    }
`

export const PostContainer = styled.div`
    background-color: #242526;
    padding: 1rem;
    border-radius: 8px;
    color: #b0b3b8;
    button {
        color: #b0b3b8;
    }
    .user_info {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        & > div {
            width: 50px;
            height: 50px;
        }
        div:nth-of-type(2) {
            flex: 1;
            svg {
                font-size: 1rem;
                margin-left: 0.5rem;
                margin-bottom: 2px;
            }
        }
        h6 {
            margin: 0;
        }
    }
    .captition {
        padding: 1rem 0.5rem;
        color: #ffffffd6;
    }
    .post_content.text {
        /* min-height: 220px; */
        padding: 1rem;
        font-size: 1.7rem;
        color: #ffffffd6;
    }
    .post_content.image {
        .image_display {
            max-height: 500px;
            overflow: auto;
            padding: 0 .5rem;
            &::-webkit-scrollbar {
                width: 5px;
                background-color: none;
            }
            &::-webkit-scrollbar-thumb {
                background-color: #333;
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .video-player-wrapper {
        width: 100%;
    }
    .post_content.video {
        position: relative;
        .videi_loading {
            /* padding: 1rem; */
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #242526;
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;

            button {
                width: 100%;
                height: 100%;
                font-size: 2rem;
                color: #fff;
                border: none;
            }
            .loading_animation {
                span {
                    opacity: 0;
                    animation-name: dot;
                    animation-duration: 1s;
                    animation-iteration-count: infinite;
                    animation-direction: alternate-reverse;
                    animation-fill-mode: forwards;
                    &:nth-of-type(2) {
                        animation-delay: 1s;
                    }
                    &:last-of-type {
                        animation-delay: 2s;
                    }
                }
                @keyframes dot {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
            }
        }
    }
    .count_interactions {
        padding: 1rem .5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > div {
            display: flex;
            align-items: center;
            gap: .5rem;
            .MuiAvatar-root {
                border: none;
                border-radius: 0;
                width: 20px;
                height: 20px;
            }
        }
    }
    .interaction_actions {
        display: flex;
        position: relative;
        button {
            flex: 1;
            border-radius: 0;
        }
        .emotes {
            display: flex;
            justify-content: center;
            width: 50%;
            min-width: 300px;
            position: absolute;
            background-color: #333;
            padding: .2rem .5rem;
            border-radius: 8px;
            top: -60px;
            left: 0;
            opacity: 0;
            z-index: -1;
            transform: translateY(100px);
            button {
                border-radius: 50%;
            }
            button:hover {
                background-color: #a4a4a426;
            }
        }
        .emotes.opened{
            transition: .3s all ease-in-out;
            opacity: 1;
            z-index: 100;
            transform: translateY(0);
        }
    }
    .display_comments {
        padding: 2rem 1rem;
        max-height: 400px;
        overflow: auto;
        &::-webkit-scrollbar {
            background: none;
            width: 5px;
        }
        &::-webkit-scrollbar-thumb {
            background: rgb(58, 58, 58);
        }

        .comment {
            width: 100%;
            margin-bottom: .5rem;
            display: flex;
            & > div {
                background-color: rgb(58, 58, 58);
                width: fit-content;
                border-radius: 8px;
                max-width: 200px;
            }
            .user_info {
                display: flex;
                align-items: center;
                gap: .5rem;
                margin: 0;
                padding: .5rem .5rem 0;
                div {
                    width: 30px;
                    height: 30px;
                }
                span {
                    font-size: 14px;
                }
            }
            .content {
                padding: .5rem 1.5rem;
                max-height: 350px;
                overflow: auto;
                &::-webkit-scrollbar {
                    width: 5px;
                    background-color: #333;
                }
                &::-webkit-scrollbar-thumb {
                    width: 5px;
                    background-color: #b0b3b8;
                }
            }
            &.comment_left {
                justify-content: start;
            }
            &.comment_right {
                justify-content: end;
            }
            hr {
                margin: 0;
                margin-top: .5rem;
                color: #888;
            }
        }
    }
    .input_comments {
        display: flex;
        input {
            border: none;
            outline: none;
            background: rgb(58, 58, 58);
            color: #b0b3b8;
            padding: .5rem 1rem;
            width: 100%;
            height: 100%;
        }
        button {
            color: #fff;
            background-color: #027deb;
            border-radius: 0;
        }
        button:hover {
            background-color: #3d8fd8;
        }
    }
`


