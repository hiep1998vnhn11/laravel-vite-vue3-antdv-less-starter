<template>
    <a-row :gutter="16" class="dashboard-list-card">
        <a-col :xs="24" :md="6" class="mb-2">
            <div class="dashboard-list-card__card">
                <div class="dashboard-list-card__card__text">
                    <div class="dashboard-list-card__card__text__title">1</div>
                    <div class="dashboard-list-card__card__text__des">1</div>
                </div>
                <div class="dashboard-list-card__card__icon">1</div>
            </div>
        </a-col>
        <a-col :xs="24" :md="6" class="mb-2">
            <div class="dashboard-list-card__card green">
                <div class="dashboard-list-card__card__text">
                    <div class="dashboard-list-card__card__text__title">1</div>
                    <div class="dashboard-list-card__card__text__des">1</div>
                </div>
                <div class="dashboard-list-card__card__icon green">1</div>
            </div>
        </a-col>
        <a-col :xs="24" :md="6" class="mb-2">
            <div class="dashboard-list-card__card light-blue">
                <div class="dashboard-list-card__card__text">
                    <div class="dashboard-list-card__card__text__title">1</div>
                    <div class="dashboard-list-card__card__text__des">1</div>
                </div>
                <div class="dashboard-list-card__card__icon light-blue">1</div>
            </div>
        </a-col>
        <a-col :xs="24" :md="6" class="mb-2">
            <div class="dashboard-list-card__card orange">
                <div class="dashboard-list-card__card__text">
                    <div class="dashboard-list-card__card__text__title">1</div>
                    <div class="dashboard-list-card__card__text__des">1</div>
                </div>
                <div class="dashboard-list-card__card__icon orange">1</div>
            </div>
        </a-col>
    </a-row>
</template>
<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue'
export default defineComponent({
    name: 'ListCard',
    setup() {
        onMounted(() => {})
        return {}
    },
})
</script>
<style lang="less" scoped>
.dashboard-list-card {
    &__card {
        border: none;
        background: @white;
        border-radius: 12px;
        padding: 30px;
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: space-between;

        &::after {
            content: '';
            position: absolute;
            height: 100%;
            left: 0;
            top: 0;
            width: 6px;
            background: @primary-color;
        }
        &.green::after {
            background: @green;
        }
        &.light-blue::after {
            background: @light-blue;
        }
        &.orange::after {
            background: @orange;
        }

        &__text {
            &__des {
                font-weight: 500;
                font-size: 16px;
                line-height: 19px;
                letter-spacing: -0.02em;

                /* Mutted Blue */

                color: #98a5cd;
            }

            &__title {
                font-weight: 600;
                font-size: 30px;
                line-height: 36px;
                letter-spacing: -0.02em;

                /* Black */

                color: #2d2f3f;
            }
        }

        &__icon {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            background: @primary-color;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            color: @white;
            &.light-blue {
                background: @light-blue;
            }
            &.green {
                background: @green;
            }
            &.orange {
                background: @orange;
            }
        }
    }
}
</style>
