<template>
    <PageWrapper
        dense
        contentFullHeight
        fixedHeight
        contentClass="px-2"
        title="Campaign Performance"
    >
        <template #extra>
            <a-range-picker @change="onChange">
                <template #suffixIcon>
                    <img src="/images/calendar.svg" />
                </template>
            </a-range-picker>
        </template>
        <a-row :gutter="16">
            <a-col :xs="24" :md="8" class="mb-2">
                <Card title="Google Ads" class="custom-card">
                    <CustomerJourneyFlow />
                </Card>
            </a-col>
            <a-col :xs="24" :md="8" class="mb-2">
                <Card title="Display network" class="custom-card">
                    <CustomerJourneyFlow />
                </Card>
            </a-col>
            <a-col :xs="24" :md="8" class="mb-2">
                <Card title="Social Facebook & Instagram" class="custom-card">
                    <PaidJourney />
                </Card>
            </a-col>
        </a-row>

        <div>Creative Performance</div>

        <a-row :gutter="16">
            <a-col :xs="24" :md="8" class="mb-2">
                <Card title="Google Ads" class="custom-card">
                    <CustomerJourneyFlow />
                </Card>
            </a-col>
            <a-col :xs="24" :md="8" class="mb-2">
                <Card title="Display network" class="custom-card">
                    <CustomerJourneyFlow />
                </Card>
            </a-col>
            <a-col :xs="24" :md="8" class="mb-2">
                <Card title="Social Facebook & Instagram" class="custom-card">
                    <PaidJourney />
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
    name: 'DigitalCompaign',
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
