<template>
    <div>
        <p>
            <a href="#" class="underline  underline-offset-2  decoration-wavy decoration-slate-400 hover:decoration-slate-700 transition duration-150 " @click="handleButtonClick($event)">
                {{ text }}
            </a>
        </p>
        <div class="pop-up" :class="{ open: popUpOpen }">
            <div class="content">
                <div class="container">
                    <div class="dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                    <span class="close" @click="handleCloseClick">close</span>
                    <div>
                        <iframe width="530" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                            id="gmap_canvas"
                            :src="`https://maps.google.com/maps?width=781&amp;height=400&amp;hl=en&amp;q=${location}&amp;t=&amp;z=4&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`"></iframe><a
                            href='https://maps-generator.com/'>Maps Generator</a>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
const { text, location } = defineProps(['text', 'location'])
const popUpOpen = ref(false)

const handleButtonClick = (event) => {
    event.preventDefault()
    popUpOpen.value = true;
};

const handleCloseClick = () => {
    popUpOpen.value = false;
};

</script>



<style lang="scss" scoped>
:root {
    --text: #2B3044;
    --line: #BBC1E1;
    --line-active: #275EFE;
}

/* MIXINS
========================================== */

@mixin animation($animation) {
    -webkit-animation: #{$animation};
    -moz-animation: #{$animation};
    -o-animation: #{$animation};
    animation: #{$animation};
}

@mixin animation-delay($animation-delay) {
    -webkit-transition-delay: #{$animation-delay};
    -moz-transition-delay: #{$animation-delay};
    -o-transition-delay: #{$animation-delay};
    transition-delay: #{$animation-delay};
}

@mixin keyframes($keyframes) {
    @-webkit-keyframes #{$keyframes} {
        @content;
    }

    @-moz-keyframes #{$keyframes} {
        @content;
    }

    @-o-keyframes #{$keyframes} {
        @content;
    }

    @keyframes #{$keyframes} {
        @content;
    }
}

@mixin transform($transform) {
    -webkit-transform: $transform;
    -moz-transform: $transform;
    -ms-transform: $transform;
    -o-transform: $transform;
    transform: $transform;
}

@mixin transition($transition) {
    -webkit-transition: #{$transition};
    -moz-transition: #{$transition};
    -o-transition: #{$transition};
    transition: #{$transition};
}

@mixin transition-delay($transition-delay) {
    -webkit-transition-delay: #{$transition-delay};
    -moz-transition-delay: #{$transition-delay};
    -o-transition-delay: #{$transition-delay};
    transition-delay: #{$transition-delay};
}

/* KEYFRAMES
========================================== */

@include keyframes(float) {
    0% {
        transform: translatey(0px);
        transform: translatex(0px);
    }

    50% {
        transform: translatey(-30px);
        transform: translatex(20px);
    }

    100% {
        transform: translatey(0px);
        transform: translatex(0px);
    }
}

.button {

    span {

        font-family: inherit;
        border: 0;
        overflow: hidden;
        outline: 0;
        @include transition(all .4s);
        visibility: visible;
        opacity: 1;

        &:hover {
            cursor: pointer;
        }

    }

    &.clicked {
        span {
            visibility: hidden;
            opacity: 0;
        }
    }
}

/* POP-UP
========================================== */

.pop-up {
    position: absolute;
    top: 48%;
    // bottom: 50%;
    // right: 50%;
    left: 50%;
    @include transform(translate(-50%, -50%) scale(0.9));
    overflow-y: auto;
    box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.4);
    visibility: hidden;
    opacity: 0;
    @include transition(all .3s);
    z-index: 10;
    width: 100%;
    height: 100%;
    // background-color: aliceblue;
    backdrop-filter: blur(100px);
    border-radius: 30px;



    @media (min-width: 768px) {
        width: calc(70% - 40px);
        max-height: 523px;
        max-width: 800px;
    }

    .content {
        width: 100%;
        max-width: 900px;
        overflow: hidden;
        text-align: center;
        position: relative;
        min-height: 100vh;

        @media (min-width: 768px) {
            min-height: inherit;
        }

        .container {
            padding: 50px 20px 60px;

            @media (min-width: 568px) {
                padding: 40px 20px 40px;
            }

            @media (min-width: 768px) {
                padding: 40px 0px 59px;
                max-width: 520px;
                margin: 0 auto;
            }
        }

        .close {
            position: absolute;
            bottom: 20px;
            left: 20px;
            font-size: 1.1rem;
            letter-spacing: 0.05rem;
            color: #141414;
            @include transition(all .4s);
            z-index: 12;

            &:hover {
                cursor: pointer;
                color: #275EFE;
            }
        }

        .dots {
            .dot {
                position: absolute;
                border-radius: 100%;
                z-index: 11;

                &:nth-of-type(1) {
                    bottom: -120px;
                    left: -120px;
                    width: 240px;
                    height: 240px;
                    background-color: #8fcdfc;
                    @include animation(float 6s ease-in-out infinite);

                }

            }
        }

        img {
            width: 100%;
            max-width: 220px;
            display: inline-block;
            margin: 30px 0 40px 0;
            opacity: 0;
            @include transform(translateX(60px));
            @include transition(.2s);
            -webkit-backface-visibility: hidden;

            @media (min-width: 768px) {
                max-width: 300px;
            }
        }

    }

    &.open {
        visibility: visible;
        opacity: 1;
        @include transform(translate(-50%, -50%) scale(1));

        img {
            opacity: 1;
            @include transition(1s);
            @include transition-delay(.3s);
            @include transform(translateX(0px));
        }
    }
}





html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
}

* {
    box-sizing: inherit;

    &:before,
    &:after {
        box-sizing: inherit;
    }
}
</style>