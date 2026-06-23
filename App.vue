<script>
	import { useUserStore } from './store/user.js'

	export default {
		onLaunch: function() {
			console.log('App Launch');
			useUserStore().getUserInfo();
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style lang="scss">
	/*每个页面公共css */
	uni-page-body,
	page {
		height: 100%;
	}

	page {
		background: $uni-bg-color-grey;
	}
	
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.amap-logo {
		display: none !important;
	}

	.amap-copyright {
		display: none !important;
	}

	.uni-radio-input {
		border-radius: 2px !important;
	}
	
	.uni-modal__textarea {
	    border: 0;
	    font-size: 16px;
	    border: 1px solid $uni-border-color;
	    background-color: white;
	}
</style>