export default {
    created() {
        if (this.parseQuery)
            this.parseQueryString();

        this.$nextTick(this.syncColumns);
        this.$q.loading.show({delay: 0});
        this.get().finally(() => this.$q.loading.hide());


    },

    data() {
        return {
            loading: false,
            type: 'scroll',
            shouldWatchFilters: true
        }
    },

    props: {
        select: {
            type: Boolean,
            required: false,
            default: false,
        },

        selected: {
            type: Array,
            required: false,
        },

        parseQuery: {
            required: false,
            default: true,
            type: Boolean,
        },
        disableColumnSync: {
            required: false,
            default: false,
            type: Boolean
        }
    },

    computed: {
        filteredColumns() {
            if (this.columns.length)
                return this.columns.map((item, index) => {
                    item.field = this.defaultColumns[index].field ? this.defaultColumns[index].field : item.name;
                    item.required = this.defaultColumns[index].hasOwnProperty('required') ? this.defaultColumns[index].required : false;
                    item.align = item.align ? item.align : 'left';
                    return item;
                }).filter(item => item.visible);

            return [];
        },

        container() {
            return this.type === 'scroll' ? 'q-infinite-scroll' : 'div';
        },
        columns: {
            get() {
                const names = JSON.parse(this.$q.localStorage.getItem(this.$options.name));

                if (this.disableColumnSync || (!names || Object.keys(names).length !== this.defaultColumns.length))
                    return this.columns = this.defaultColumns;
                return this.defaultColumns.map(c => {
                    c.visible = names[c.name];
                    return c;
                });
            },
            set(cols) {
                let columns = {};
                cols.forEach(c => {
                    columns[c.name] = c.visible
                })
                if (!this.disableColumnSync)
                    localStorage.setItem(this.$options.name, JSON.stringify(columns))
            }
        },

        allPagesLoaded() {
            return this.paginator.page >= this.paginator.totalPages;
        },

        hasFilters() {
            return Object.keys(this.filters).reduce((carry, key) => carry || this.filters[key] !== null, false)
        },

        _paginator() {
            return {
                page: this.paginator.page,
                sortBy: this.paginator.sortBy,
                descending: this.paginator.descending,
            }
        },
        _page() {
            return this._paginator.page;
        },
        _sortBy() {
            return this.paginator.sortBy;
        },

        _descending() {
            return this.paginator.descending;
        }
    },

    watch: {
        filters: {
            handler: function () {
                if (this.parseQuery) {
                    let query = {};
                    Object.keys(this.filters).forEach((key) => this.filters[key] !== null ? query[key] = this.filters[key] : null);
                    if (this.shouldUpdateQueryString(query, this.$route.query)) {
                        this.$router.replace({query});
                        this.onFiltersChanged();
                    }
                }
                else {
                    this.onFiltersChanged();
                }
            },
            deep: true
        },
        _page(_new, _old) {
            this.get();
        },
        _sortBy(_new, _old) {
            this.get();
        },
        _descending(_new, _old) {
            this.get();
        },

    },


    methods: {

        get() {
            return new Promise((resolve, reject) => {
                this.loading = true;
                this.$axios.get(this.endpoints.index, {
                    params: {
                        ...this._paginator,
                        ...this.filters
                    }
                })
                    .then((response) => {
                        this.paginator.page === 1 || this.type === 'pagination' ? this.api.items = [] : null;
                        Object.keys(this.api).forEach((key) => this.api[key] = (key === 'items') ? [...this.api.items, ...response.data.paginator.data] : response.data[key]);
                        this.paginator.totalPages = response.data.paginator.last_page;
                        this.paginator.rowsNumber = response.data.paginator.total
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    })
                    .finally(() => {
                        this.$q.loading.hide();
                        this.loading = false;
                    })
                ;
            });
        },

        async onPullToRefresh(done) {
            if (this.type === 'scroll' && this.$refs.infiniteScroll)
                this.$refs.infiniteScroll.reset();
            this.paginator.page = 1;
            await this.get().finally(done);
        },

        onRefresh() {
            if (this.type === 'scroll' && this.$refs.infiniteScroll)
                this.$refs.infiniteScroll.reset();
            this.paginator.page = 1;
            this.get();
        },

        loadMore(index, done) {
            if (index > this.paginator.totalPages)
                return done();
            this.paginator.page++;
            this.get().finally(() => done())
        },

        onTableRequest(payload) {
            if (this.type === 'scroll' && this.$refs.infiniteScroll)
                this.$refs.infiniteScroll.reset();
            this.paginator = payload.pagination;
            this.paginator.page = 1;
            this.api.items = [];
            this.get();
        },

        onFiltersChanged() {
            if (this.shouldWatchFilters)
                this.onSearch()

        },
        onSearch() {
            if (this.type === 'scroll' && this.$refs.infiniteScroll)
                this.$refs.infiniteScroll.reset();
            this.paginator.page = 1;
            this.api.items = [];
            this.get();
        },



        clearSearch() {
            this.filters.search = null;
            if (this.type === 'scroll' && this.$refs.infiniteScroll)
                this.$refs.infiniteScroll.reset();
            this.paginator.page = 1;
        },

        syncColumns() {
            let columns = this.columns.map(item => item.name);
            let defaultColumns = this.defaultColumns.map(item => item.name);
            let difference = defaultColumns.filter(x => !columns.includes(x))
                .concat(columns.filter(x => !defaultColumns.includes(x)));
            if (difference && difference.length)
                this.columns = this.default.columns;
        },

        parseQueryString() {
            let params = this.$route.query;
            Object.keys(this.filters).forEach((key) => {
                if (params.hasOwnProperty(key)) {
                    this.filters[key] = params[key];
                    if (!isNaN(this.filters[key]) && !isNaN(parseFloat(this.filters[key])))
                        this.filters[key] = parseFloat(this.filters[key]);

                    if (this.filters[key] === 'true' || this.filters[key] === 'false')
                        this.filters[key] = JSON.parse(this.filters[key])
                }
            });
        },

        shouldUpdateQueryString(q, rQ) {
            return !Object.keys(q).length || Object.keys(q).filter(item => !(rQ.hasOwnProperty(item) && String(rQ[item]) === String(q[item]))).concat(Object.keys(rQ).filter(item => !(q.hasOwnProperty(item) && String(q[item]) === String(rQ[item])))).length > 0; //YOLO
        },

        onDestroyed({pageIndex}) {
            this.api.items.splice(pageIndex, 1);
        },



        onItemSelected(item) {
            this.$emit('selected', {item});
        }

    }
}
