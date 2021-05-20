<template>
	<q-layout view="hHh LpR fff">

		<q-header reveal elevated class="bg-primary text-white q-pa-lg">
			<q-toolbar>

				<q-toolbar-title>
					<router-link to="/" style="text-decoration: none;">
						<div class="flex column">
							<div>
								<span class="brand-name">Scopic test</span>
							</div>
							<span class="brand-tagline">Test Task by Faran Ali</span>
						</div>
					</router-link>
				</q-toolbar-title>

				<q-space/>
				<div class="cursor-pointer">
					<div>
						<q-btn color="secondary" :to="{name:'home.index'}" class="q-mr-md">Home</q-btn>
						<q-btn color="secondary" :to="{name:'books.index'}">Books</q-btn>
					</div>
				</div>
			</q-toolbar>

		</q-header>

		<q-page-container>
			<router-view/>
		</q-page-container>

	</q-layout>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
	data() {
		return {
			left: false,
			miniState: true,


		}
	},

	computed: {},

	methods: {
		async logout() {
			await this.$store.dispatch('auth/logout');
			await this.$router.push({name: 'login'});
		},
	}
}
</script>

<style lang="scss" scoped>
.brand-name {
	font-family: Roboto, sans-serif;
	font-weight: 900;
	font-size: 2em;
	font-style: italic;
	border-bottom: 1px solid #fff;
	line-height: 1.4;
	color: #fff;
	text-decoration: none;
}

.brand-tagline {
	font-size: 0.47em;
	line-height: 1;
	color: #c6c9de;
	font-style: italic;
}
</style>
