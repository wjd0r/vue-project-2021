import Chart from './Chart.vue';

export default {
  title: 'Dashboard/Chart',
  component: Chart,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Chart },
  template: '<div style="width:calc(100vw - 16px); height: calc(100vh - 32px)"><Chart /></div>',
});


export const Test = Template.bind({});
