<template>
	<q-page padding>
		<q-card>
			<q-card-section>
				<q-table
					flat
					title="Books & Authors"
					:data="api.books"
					:columns="columns"
					row-key="name"
					separator="cell"
					bordered
				>
					<template v-slot:body-cell-published="props">
						<q-td >
							{{props.row.published | date}}
						</q-td>
					</template>

					<template v-slot:body-cell-price="props">
						<q-td >
							<span class="text-bold">{{props.row.price | price}}</span>
						</q-td>
					</template>
				</q-table>
			</q-card-section>
		</q-card>
	</q-page>
</template>

<script>
import books from './books.json'

export default {
	name: "Books",

	created() {
		this.get();
	},
	data() {
		return {
			api: {
				books: []
			},
			columns: [
				{name: 'title', field: 'title', align: 'left', label: 'Book Title', sortable: true},
				{name: 'published', field: 'published', align: 'left', label: 'Published on', sortable: true},
				{name: 'author', field: 'author', align: 'left', label: 'Author name', sortable: true},
				{name: 'price', field: 'price', align: 'left', label: 'Price', sortable: true},
			]
		};
	},
	methods: {
		get() {
			//simulating a network call and setting the api data for books.
			this.api.books = books;
		}
	}
}
</script>

<style scoped>

</style>
