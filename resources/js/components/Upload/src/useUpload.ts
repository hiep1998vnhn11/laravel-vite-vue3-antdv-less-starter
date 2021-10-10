import { Ref, unref, computed } from 'vue'
import { useI18n } from '/@/hooks/web/useI18n'
const { t } = useI18n()
export function useUploadType({
  acceptRef,
  helpTextRef,
  maxNumberRef,
  maxSizeRef,
}: {
  acceptRef: Ref<string[]>
  helpTextRef: Ref<string>
  maxNumberRef: Ref<number>
  maxSizeRef: Ref<number>
}) {
  const getAccept = computed(() => {
    const accept = unref(acceptRef)
    if (accept && accept.length > 0) {
      return accept
    }
    return []
  })
  const getStringAccept = computed(() => {
    return unref(getAccept)
      .map((item) => `.${item}`)
      .join(',')
  })

  const getHelpText = computed(() => {
    const helpText = unref(helpTextRef)
    if (helpText) {
      return helpText
    }
    const helpTexts: string[] = []

    const accept = unref(acceptRef)
    if (accept.length > 0) {
      helpTexts.push(t('component.upload.accept', [accept.join(',')]))
    }

    const maxSize = unref(maxSizeRef)
    if (maxSize) {
      helpTexts.push(t('component.upload.maxSize', [maxSize]))
    }

    const maxNumber = unref(maxNumberRef)
    if (maxNumber && maxNumber !== Infinity) {
      helpTexts.push(t('component.upload.maxNumber', [maxNumber]))
    }
    return helpTexts.join('，')
  })
  return { getAccept, getStringAccept, getHelpText }
}
