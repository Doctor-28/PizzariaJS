<template>
	<div class="franchise-list">
		<div class="table">
			<b-table
				@row-clicked="editFranchise"
				hover
				bordered
				:items="franchises"
				:fields="['name', 'shopsNumber', { 'user.name': 'User' }]"
			/>
		</div>

		<div class="add-franchise">
			<input
				type="text"
				v-model="franchise.name"
				name="franchise name"
				placeholder="Name"
			/>
			<input
				type="number"
				v-model="franchise.shopsNumber"
				name="franchise shopsNumber"
				placeholder="Shops Number"
			/>
			<input
				type="email"
				v-model="franchise.userEmail"
				name="franchise userEmail"
				placeholder="User Email"
			/>
			<b-button
				@click="addFranchise(franchise)"
				class="btn-add"
				variant="success"
				size="lg"
				show
				>+</b-button
			>
		</div>
		<div class="divider"></div>
	</div>
</template>

<script>
import { getFranchisesFromUser, createFranchise } from '../services/franchises.js';

export default {
	data() {
		return {
			franchises: [],
			franchise: {
				name: "",
				shopsNumber: null,
				userEmail: ""
			}
		}
	},
	methods: {
		editFranchise(item) {
			this.$router.push(`/franchises/${item.id}`);
		},
		addFranchise(franchise){
			createFranchise(franchise)
				.then(res=> console.log(res.data))
				.catch(error => console.log(error.response));
		}
	},
	created() {
		getFranchisesFromUser(this.$store.state.user.id)
			.then(res => this.franchises=res.data);
	}
}
</script>

<style lang="scss">
	$main-green: #41b883;
	$secondary-green: #4fc08d;
	$ripple-green: #08903e;

	@mixin transition($property) {
		-webkit-transition: $property;
		transition: $property;
	}

	.franchise-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #fff;
		margin-top: 3.6rem;
		width: 100%;
		height: 100%;

		table {
			thead {
				tr {
					user-select: none;
				}
			}

			tbody {
				tr {
					cursor: pointer;
				}
			}
		}
		.add-franchise {
			display: flex;
			margin-bottom: 15px;
			width: 60%;
			justify-content: center;

			.btn-add {
				margin-bottom: 5px;
				border-radius: 50%;
			}

			input {
				border: none;
				outline: none;
				color: #212121;
				padding: 5px 2px 0 2px;
				font-size: 18px;
				border-bottom: 1px solid $secondary-green;
				margin-right: 10px;
				width: 100%;
				text-align: center;

				&:-webkit-autofill,
				&:-webkit-autofill:hover,
				&:-webkit-autofill:focus,
				&:-webkit-autofill:active {
					box-shadow: 0 0 0 30px white inset;
				}
			}
		}

		.divider {
			width: 100%;
			height: 2px;
			background-color: $main-green;
		}
	}
</style>
