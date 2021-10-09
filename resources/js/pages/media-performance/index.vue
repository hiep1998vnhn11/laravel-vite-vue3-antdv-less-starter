<template>
    <PageWrapper
        dense
        contentFullHeight
        fixedHeight
        contentClass="px-2"
        title="Media Performance"
    >
        <template #extra>
            <a-range-picker @change="onChange">
                <template #suffixIcon>
                    <img src="/images/calendar.svg" />
                </template>
            </a-range-picker>
        </template>
        <a-row :gutter="16">
            <a-col :xs="24" :md="12" class="mb-2">
                <Card title="Custommer Journey Flow" class="custom-card">
                    <KeyMetrics />
                </Card>
            </a-col>
            <a-col :xs="24" :md="12" class="mb-2">
                <Card
                    title="Sale Funnel: Number of visitors"
                    class="custom-card"
                >
                    <SaleFunnel />
                </Card>
            </a-col>
            <a-col :xs="24" :md="12" class="mb-2">
                <Card title="Daily Spend by Channel" class="custom-card">
                    <DailySpendChannel />
                </Card>
            </a-col>
            <a-col :xs="24" :md="12" class="mb-2">
                <Card title="Daily ROAS" class="custom-card">
                    <DailyRoas />
                </Card>
            </a-col>
        </a-row>
    </PageWrapper>
</template>
<script lang="ts">
import { onMounted, ref } from 'vue'
import { PageWrapper } from '/@/components/Page'
import { Tag, Card, RangePicker } from 'ant-design-vue'
import KeyMetrics from './components/KeyMetrics.vue'
import DailyRoas from './components/DailyRoas.vue'
import DailySpendChannel from './components/DailySpendChannel.vue'
import SaleFunnel from './components/SaleFunnel.vue'
export default {
    name: 'MediaPerformance',
    components: {
        PageWrapper,
        Card,
        Tag,
        'a-range-picker': RangePicker,
        KeyMetrics,
        DailyRoas,
        DailySpendChannel,
        SaleFunnel,
    },
    setup() {
        onMounted(() => {})
        return {}
    },
}
</script>
<style lang="less" scoped></style>
