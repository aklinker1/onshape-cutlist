<script lang="ts" setup>
const props = defineProps<{
  part: Rectangle<PartToCut>;
}>();

const { x, y } = useGlobalMouse();
</script>

<template>
  <div
    v-if="x != 0 && y != 0"
    class="fixed w-px h-px z-10"
    :style="`left:${x}px;top:${y}px`"
  >
    <PartDetails
      class="translate-x-[-50%] translate-y-8 p-2 bg-gray-600 rounded shadow-xl min-w-[256px]"
      :part="part.data"
      :placement="part"
    />
  </div>
</template>
