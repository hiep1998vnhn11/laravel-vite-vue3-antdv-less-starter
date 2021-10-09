<template>
    <PageWrapper
        dense
        contentFullHeight
        fixedHeight
        contentClass="px-2"
        title="Dashboard"
    >
        <template #extra>
            <a-range-picker @change="onChange">
                <template #suffixIcon>
                    <img src="/images/calendar.svg" />
                </template>
            </a-range-picker>
        </template>
        <ListCard />
        <div>Creative Performance</div>
        <a-row :gutter="16">
            <a-col :xs="24" :md="12" class="mb-2">
                <Card title="Daily Spend by Channel" class="custom-card">
                    <DailySpendChannel />
                </Card>
            </a-col>
            <a-col :xs="24" :md="12" class="mb-2">
                <Card title="Sales" class="custom-card">
                    <CustomerJourneyFlow />
                </Card>
            </a-col>
        </a-row>
    </PageWrapper>
</template>
<script lang="ts">
import { onMounted, ref } from 'vue'
import { PageWrapper } from '/@/components/Page'
import { Tag, Card, RangePicker } from 'ant-design-vue'
import CustomerJourneyFlow from './components/CustomerJourneyFlow.vue'
import DailySpendChannel from './components/DailySpendChannel.vue'
import ListCard from './components/ListCard.vue'
export default {
    name: 'Dashboard',
    components: {
        PageWrapper,
        Card,
        Tag,
        'a-range-picker': RangePicker,
        CustomerJourneyFlow,
        DailySpendChannel,
        ListCard,
    },
    setup() {
        onMounted(() => {})
        return {}
    },
}
</script>
<style lang="less" scoped></style>
