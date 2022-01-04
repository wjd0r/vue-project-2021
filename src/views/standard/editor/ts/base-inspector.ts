import Vue from 'vue';
import { Prop, Watch } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { dia } from '@iochord/ipr-fre-ent-core';

export interface IProperties {
  [property: string]: dia.Path;
}

@Component({} as any)
export abstract class BaseInspector extends Vue {
  @Prop() cell: dia.Cell;

  public props: IProperties;

  @Watch('cell')
  onPropertyChanged(currentValue: dia.Cell, previousValue: dia.Cell): void {
    this.removeCellListener(previousValue);
    this.addCellListener(currentValue);
    this.assignFormFields();
  }

  public mounted(): void {
    this.addCellListener(this.cell);
    this.assignFormFields();
  }

  public beforeDestroy(): void {
    this.removeCellListener(this.cell);
  }

  public changeCellProp(path: dia.Path, value: any): void {
    this.cell.prop(path, value);
  }

  protected abstract assignFormFields(): void;

  private addCellListener(cell: dia.Cell): void {
    cell.on('change', () => this.assignFormFields(), this);
  }

  private removeCellListener(cell: dia.Cell): void {
    cell.off(null, null, this);
  }
}
