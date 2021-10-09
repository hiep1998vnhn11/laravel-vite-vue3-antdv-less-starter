<template>
    <PageWrapper
        dense
        contentFullHeight
        fixedHeight
        contentClass="px-2"
        title="Customer Journey"
    >
        <template #extra>
            <a-range-picker @change="onChange">
                <template #suffixIcon>
                    <img src="/images/calendar.svg" />
                </template>
            </a-range-picker>
        </template>
        <a-row :gutter="16">
            <a-col :xs="24" :md="16" class="mb-2">
                <Card title="Customer Journey Flow" class="custom-card">
                    <CustomerJourneyFlow />
                </Card>
            </a-col>
            <a-col :xs="24" :md="8" class="mb-2">
                <Card title="Paid Journey" class="custom-card">
                    <PaidJourney />
                </Card>
            </a-col>
        </a-row>

        <div>Top & bottom funnel</div>
        <p>All journeys</p>

        <a-row :gutter="16">
            <a-col :xs="24" :md="8" class="mb-2">
                <Card title="Daily Spend by Channel" class="custom-card">
                    <JourneyChannel />
                </Card>
            </a-col>
            <a-col :xs="24" :md="8" class="mb-2">
                <Card title="Daily ROAS" class="custom-card">
                    <JourneyChannel />
                </Card>
            </a-col>
            <a-col :xs="24" :md="8" class="mb-2">
                <Card title="Daily ROAS" class="custom-card">
                    <JourneyChannel />
                </Card>
            </a-col>
        </a-row>
        <p>Paid journeys</p>
        <a-row :gutter="16">
            <a-col :xs="24" :md="8" class="mb-2">
                <Card title="Daily Spend by Channel" class="custom-card">
                    <JourneyChannel />
                </Card>
            </a-col>
            <a-col :xs="24" :md="8" class="mb-2">
                <Card title="Daily ROAS" class="custom-card">
                    <JourneyChannel />
                </Card>
            </a-col>
            <a-col :xs="24" :md="8" class="mb-2">
                <Card title="Daily ROAS" class="custom-card">
                    <JourneyChannel />
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
import JourneyChannel from './components/JourneyChannel.vue'
import PaidJourney from './components/PaidJourney.vue'
export default {
    name: 'CustomerJourney',
    components: {
        PageWrapper,
        Card,
        Tag,
        'a-range-picker': RangePicker,
        CustomerJourneyFlow,
        JourneyChannel,
        PaidJourney,
    },
    setup() {
        onMounted(() => {})
        return {}
    },
}
</script>
<style lang="less" scoped></style>
