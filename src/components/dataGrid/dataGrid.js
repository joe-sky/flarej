import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';
import { lazyDo } from '../../utils/delayOperate';
import '../pagination';
import '../antd/input';
import '../antd/table';
import '../antd/tooltip';
import '../antd/button';
import '../antd/checkbox';
import template from './dataGrid.t.html';

@registerTmpl('fj-DataGrid')
class DataGrid extends Component {
  static propTypes = {
    columns: PropTypes.array,
    locale: PropTypes.object,
    data: PropTypes.array,
    searchDelay: PropTypes.number,
    tableProps: PropTypes.object,
    onPageChange: PropTypes.func,
    onTableScrollBottom: PropTypes.func,
    onSearchData: PropTypes.func,
    showPageSize: PropTypes.bool,
    showDataCount: PropTypes.bool,
    showDataFilter: PropTypes.bool,
    bordered: PropTypes.bool
  };

  static defaultProps = {
    localMode: true,
    locale: {
      emptyText: '没有数据'
    },
    paginationProps: {
      showRefresh: true
    },
    scrollBottomDelay: 30,
    loading: false,
    searchDelay: 300,
    columns: null,
    data: null,
    rowSelection: null,
    count: 0,
    pageIndex: 1,
    pageSize: 15,
    pageSizes: [15, 30, 50], //可选择的每页数据数
    showPageSize: true,
    showDataCount: true,
    showDataFilter: true,
    showColumnFilter: false,
    bordered: true,
    filterInputPosition: 'right',
    checkPropDataRef: true //从prop传入data时是否检测引用值不同
  };

  state = {
    data: null, //表格数据
    currentData: null,
    count: null, //数据总数
    pageIndex: null, //当前页码
    pageSize: null, //每页数据数
    searchText: '',
    columnFilterHideKeys: new Set()
  };

  constructor(props) {
    super(props);

    //数据初始化
    this.state.pageIndex = props.pageIndex;
    this.state.pageSize = props.pageSize;
    if (props.localMode) {
      this.state.count = props.data.length;
    } else {
      this.state.count = props.count;
      this.state.data = props.data;
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      localMode,
      pageIndex,
      pageSize,
      count,
      data,
      checkPropDataRef
    } = this.props;

    if (localMode) {
      let dataL;
      if (!checkPropDataRef || data !== nextProps.data) { //只有props.data的引用发生改变时才更新data参数
        dataL = nextProps.data;
      }

      if (pageIndex != nextProps.pageIndex || pageSize != nextProps.pageSize || dataL) {
        this.pageRefresh(pageIndex, pageSize, dataL ? dataL : this.state.currentData, '');
      }
    } else {
      let state = {
        pageIndex: nextProps.pageIndex,
        pageSize: nextProps.pageSize,
        count: nextProps.count,
        //searchText: ''
      };

      if (!checkPropDataRef || data !== nextProps.data) {
        state.data = nextProps.data;
      }
      if (this.props.loading !== nextProps.loading) {
        state.loading = nextProps.loading;
      }

      this.setState(state);
    }
  }

  componentDidMount() {
    const { onTableScrollBottom } = this.props;

    if (onTableScrollBottom) {
      const tableBody = findDOMNode(this.refs.dataTable).querySelector('div.ant-table-body');
      tableBody.addEventListener('scroll', () => {
        lazyDo(() => {
          if (tableBody.scrollTop + tableBody.clientHeight - tableBody.scrollHeight >= 0) {
            !this.preventScrollEvt && onTableScrollBottom(); //此处如果已经处于滚动条底端，则须阻止多次触发滚动到底部事件
            this.preventScrollEvt = true;
          } else {
            this.preventScrollEvt = false;
          }
        }, this.props.scrollBottomDelay, 'tableScroll', this);
      });
    }
  }

  /**
   * 分页刷新
   */
  @autobind
  pageRefresh(pageIndex, pageSize, filteredData, searchText) {
    let start = (pageIndex - 1) * pageSize;
    let end = pageIndex * pageSize;
    let tempData = filteredData ? filteredData : this.props.data;

    let data = tempData.filter(function(obj, i) {
      if (i >= start && i < end) {
        return true;
      }
    });

    let state = {
      data,
      currentData: tempData,
      count: tempData.length,
      pageIndex,
      pageSize,
      loading: false
    };

    if (searchText != null) {
      state.searchText = searchText;
    }

    this.setState(state);
  }

  /**
   * 分页控件更新事件
   */
  @autobind
  pageChange(pageIndex, pageSize, isInit) {
    if (this.props.localMode) {
      this.pageRefresh(pageIndex, pageSize, this.state.currentData);
    }

    if (this.props.onPageChange) {
      this.props.onPageChange(pageIndex, pageSize, isInit);
    }
  }

  /**
   * 每页显示数据数切换
   */
  @autobind
  sizeChange(pageSize) {
    if (this.props.localMode) {
      this.pageRefresh(1, pageSize, this.state.currentData);
    }

    if (this.props.onPageChange) {
      this.props.onPageChange(1, pageSize);
    }
  }

  /**
   * 搜索数据结果
   */
  getSearchResult(inputValue) {
    let tempValue = [],
      len = inputValue.length,
      inputValueL = inputValue.toLowerCase();

    if (len) {
      this.props.data.forEach(item => {
        if (item == null) {
          return;
        }

        for (let i in item) {
          if (item[i] != null && item[i].toString().toLowerCase().indexOf(inputValueL) >= 0) {
            tempValue.push(item);
            break;
          }
        }
      });
      if (!tempValue.length) {
        tempValue = [];
      }
    } else {
      tempValue = null; //清空搜索框时使用props.data渲染数据
    }

    return tempValue;
  }

  /**
   * 搜索数据事件
   */
  @autobind
  searchData(e) {
    const { onSearchData } = this.props;
    let value = e.target.value;
    this.setState({
      searchText: value,
      loading: true
    });

    lazyDo(() => {
      if (!onSearchData) {
        if (this.props.localMode) {
          this.pageRefresh(1, this.state.pageSize, this.getSearchResult(value)); //每次搜索后都刷新到第一页
        } else {
          const ret = this.getSearchResult(value);
          this.setState({
            data: ret != null ? ret : this.props.data,
            loading: false
          });
        }
      } else {
        onSearchData(value, () => {
          this.setState({
            loading: false
          });
        });
      }
    }, this.props.searchDelay, 'vic_dataGrid');
  }

  /**
   * 筛选列复选框点击事件
   */
  @autobind
  onCfChange(e) {
    const { columnFilterHideKeys } = this.state;
    columnFilterHideKeys[e.target.checked ? 'delete' : 'add'](e.target.value);
    this.setState({
      columnFilterHideKeys
    });
  }

  render() {
    let filterColumns;
    if(this.props.showColumnFilter && this.props.columns) {  //筛选列
      const columns = [];
      this.props.columns.forEach(col1 => {
        const col2s = col1.children.filter(col2 => !this.state.columnFilterHideKeys.has(col2.key));
        if(col2s.length) {
          columns.push(Object.assign({}, col1, { children: col2s }));
        }
      });

      filterColumns = { columns };
    }

    return template(filterColumns, this.state, this.props, this, {
      tableData: this.state.data,
      pageCount: this.refs.pagination ? this.refs.pagination.state.pageCount : 0,
      showHead: this.props.showPageSize || this.props.showDataFilter || this.props.showColumnFilter,
      searchDataRef: c => this.searchDataInput = c
    });
  }
}

export default DataGrid;