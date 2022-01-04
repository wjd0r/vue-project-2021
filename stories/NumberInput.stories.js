import NumberInput from '../src/views/userManagement/components/NumberInput.vue';

export default {
  title: 'Input/NumberInput',
  component: NumberInput,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NumberInput },
  template: '<div style="width:calc(100vw - 16px); height: calc(100vh - 32px)"><NumberInput /></div>',
});


export const numberInput = Template.bind({});
