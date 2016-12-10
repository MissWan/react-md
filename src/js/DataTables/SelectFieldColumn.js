import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import TableColumn from './TableColumn';
import SelectField from '../SelectFields/SelectField';

export default class SelectFieldColumn extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    style: PropTypes.object,
    className: PropTypes.string,
    wrapperStyle: PropTypes.object,
    wrapperClassName: PropTypes.string,
    header: PropTypes.bool,
    children: PropTypes.node,
    onMouseOver: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyDown: PropTypes.func,
    onMenuToggle: PropTypes.func,
    position: SelectField.propTypes.position,
    defaultOpen: PropTypes.bool,
  };

  static defaultProps = {
    position: SelectField.Positions.BELOW,
  };

  static contextTypes = {
    rowId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      active: !!props.defaultOpen,
      left: null,
      width: null,
    };

    this._wrapper = null;
    this._setWrapper = this._setWrapper.bind(this);
    this._handleMenuToggle = this._handleMenuToggle.bind(this);
  }

  _setWrapper(wrapper) {
    this._wrapper = wrapper;
  }

  _handleMenuToggle(active, e) {
    if (this.props.onMenuToggle) {
      this.props.onMenuToggle(active, e);
    }

    let width = null;
    let left = null;
    if (this._wrapper && active) {
      left = this._wrapper.getBoundingClientRect().left;
      width = this._wrapper.offsetWidth;
    }

    this.setState({ active, width, left });
  }

  render() {
    const { rowId } = this.context;
    const { active, width, left } = this.state;
    const {
      style,
      className,
      wrapperStyle,
      wrapperClassName,
      header,
      ...props
    } = this.props;
    delete props.id;
    delete props.onMouseOver;
    delete props.onMouseLeave;
    delete props.onTouchStart;
    delete props.onTouchEnd;

    let { id } = this.props;
    if (!id) {
      id = `${rowId}-select`;
    }

    return (
      <TableColumn
        style={{ left, ...style }}
        className={cn('prevent-grow md-select-field-column', {
          'md-table-column--fixed md-table-column--fixed-active': active,
        }, className)}
        header={header}
        onMouseOver={this._setActive}
        onMouseLeave={this._setInactive}
        onTouchStart={this._setActive}
        onTouchEnd={this._setActive}
      >
        <div
          ref={this._setWrapper}
          style={{ ...wrapperStyle, width }}
          className={wrapperClassName}
        >
          <SelectField
            id={id}
            {...props}
            onMenuToggle={this._handleMenuToggle}
            fullWidth
          />
        </div>
      </TableColumn>
    );
  }
}
