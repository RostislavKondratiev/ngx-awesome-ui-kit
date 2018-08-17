import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export abstract class FormFieldControl {

  public hasError: boolean;
  /** The value of the control. */

  public value: any;
  /**
   * Stream that emits whenever the state of the control changes such that the parent `MdFormField`
   * needs to run change detection.
   */
  public readonly stateChange$: Subject<void>;

  /** The element ID for this control. */
  public readonly id: string;

  /** The placeholder for this control. */
  public readonly placeholder?: string;

  /** Gets the NgControl for this control. */
  public readonly control: NgControl;

  public readonly element: ElementRef;

  public readonly parent: FormGroupDirective | NgForm | null;

  /** Whether the control is focused. */
  public readonly focused: boolean;

  /** Whether the control is empty. */
  // public readonly empty: boolean;

  /** Whether the control is required. */
  public readonly required: boolean;

  /** Whether the control is disabled. */
  public readonly disabled: boolean;

  public inputPosition?: Array<'left' | 'right' | 'left-transparent' | 'right-transparent'>;

  public inputIndent?: number;


  /** Whether the control is in an error state. */
  // public readonly errorState: boolean;

  /** Sets the list of element IDs that currently describe this control. */

  // public abstract setDescribedByIds(ids: string[]): void;

  /** Focuses this control. */
  public abstract focus(): void;
}
