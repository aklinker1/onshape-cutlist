<script lang="ts" setup>
const props = defineProps<{
  part: PartToCut;
  placement?: Rectanble<any>;
}>();

const width = useFormattedDistance(() => props.part.size.width);
const length = useFormattedDistance(() => props.part.size.length);
const thickness = useFormattedDistance(() => props.part.size.thickness);

const top = useFormattedDistance(() => props.placement?.top);
const left = useFormattedDistance(() => props.placement?.left);
const right = useFormattedDistance(() => props.placement?.right);
const bottom = useFormattedDistance(() => props.placement?.bottom);
</script>

<template>
  <div>
    <h3 class="text-lg text-primary">
      {{ part.partNumber }}.{{ part.instanceNumber }} {{ part.name }}
    </h3>
    <table class="font-mono">
      <tr>
        <td class="opacity-50">Width</td>
        <td class="opacity-50 whitespace-pre">{{ ' = ' }}</td>
        <td>{{ width }}</td>
      </tr>
      <tr>
        <td class="opacity-50">Length</td>
        <td class="opacity-50 whitespace-pre">{{ ' = ' }}</td>
        <td>{{ length }}</td>
      </tr>
      <tr>
        <td class="opacity-50">Thick</td>
        <td class="opacity-50 whitespace-pre">{{ ' = ' }}</td>
        <td>{{ thickness }}</td>
      </tr>
      <template v-if="placement">
        <tr>
          <td class="opacity-50">Left</td>
          <td class="opacity-50 whitespace-pre">{{ ' = ' }}</td>
          <td>{{ left }}</td>
        </tr>
        <tr>
          <td class="opacity-50">Top</td>
          <td class="opacity-50 whitespace-pre">{{ ' = ' }}</td>
          <td>{{ top }}</td>
        </tr>
        <tr>
          <td class="opacity-50">Right</td>
          <td class="opacity-50 whitespace-pre">{{ ' = ' }}</td>
          <td>{{ right }}</td>
        </tr>
        <tr>
          <td class="opacity-50">Bottom</td>
          <td class="opacity-50 whitespace-pre">{{ ' = ' }}</td>
          <td>{{ bottom }}</td>
        </tr>
      </template>
    </table>
  </div>
</template>
