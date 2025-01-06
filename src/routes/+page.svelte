<script>
	/** @type {import('./$types').ActionData} */
	export let form;

	/**
	 * @param {DragEvent} e
	 */
	function preventAndStopPropagation(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	/** @type {FileList | undefined } */
	let files;
	let dragHover = false;

	/**
	 * @param {DragEvent} ev
	 */
	function drop(ev) {
		files = ev.dataTransfer?.files;
	}
</script>

<svelte:window
	on:dragenter={preventAndStopPropagation}
	on:dragover={preventAndStopPropagation}
	on:drop={preventAndStopPropagation}
/>
<svelte:head>
	<title>NES Bundler</title>
</svelte:head>
<h1
	class="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl"
>
	NES Bundler
</h1>
<p class="mb-5 text-center">
	Enter your email and drop your bundle configuration ZIP and we'll email you the finished bundles!
	<br />
	For details look here:
	<a
		class="font-medium text-blue-600 hover:underline"
		href="https://github.com/tedsteen/nes-bundler">https://github.com/tedsteen/nes-bundler</a
	>
</p>
<form method="POST" enctype="multipart/form-data" action="?/bundle" class="max-w-sm mx-auto">
	<div class="mb-5">
		<input
			name="recipient_email"
			type="email"
			value={form?.recipient_email ?? ''}
			id="email"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
			placeholder="your@email.com"
			required
		/>
	</div>
	<div class="flex items-start mb-5">
		<label
			id="file-area"
			on:drop={drop}
			class:bg-gray-300={dragHover}
			on:dragleave={(ev) => {
				dragHover = false;
			}}
			on:dragenter={(ev) => {
				dragHover = true;
			}}
			for="dropzone-file"
			class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-300"
		>
			<div class="flex flex-col items-center justify-center pt-5 pb-6">
				{#if files}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						version="1.1"
						width="56"
						height="56"
						viewBox="0 0 256 256"
						xml:space="preserve"
					>
						<defs> </defs>
						<g
							style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
							transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
						>
							<path
								d="M 89.328 2.625 L 89.328 2.625 c -1.701 -2.859 -5.728 -3.151 -7.824 -0.568 L 46.532 45.173 c -0.856 1.055 -2.483 0.997 -3.262 -0.115 l -8.382 -11.97 c -2.852 -4.073 -8.789 -4.335 -11.989 -0.531 l 0 0 c -2.207 2.624 -2.374 6.403 -0.408 9.211 l 17.157 24.502 c 2.088 2.982 6.507 2.977 8.588 -0.011 l 4.925 -7.07 L 89.135 7.813 C 90.214 6.272 90.289 4.242 89.328 2.625 z"
								style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(111,178,6); fill-rule: nonzero; opacity: 1;"
								transform=" matrix(1 0 0 1 0 0) "
								stroke-linecap="round"
							/>
							<path
								d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 6.072 0 11.967 1.19 17.518 3.538 c 2.034 0.861 2.986 3.208 2.125 5.242 c -0.859 2.035 -3.207 2.987 -5.242 2.126 C 54.842 8.978 49.996 8 45 8 C 24.598 8 8 24.598 8 45 c 0 20.402 16.598 37 37 37 c 20.402 0 37 -16.598 37 -37 c 0 -3.248 -0.42 -6.469 -1.249 -9.573 c -0.57 -2.134 0.698 -4.327 2.832 -4.897 c 2.133 -0.571 4.326 0.698 4.896 2.833 C 89.488 37.14 90 41.055 90 45 C 90 69.813 69.813 90 45 90 z"
								style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(111,178,6); fill-rule: nonzero; opacity: 1;"
								transform=" matrix(1 0 0 1 0 0) "
								stroke-linecap="round"
							/>
						</g>
					</svg>
				{:else}
					<svg
						class="w-8 h-8 mb-4 text-gray-500"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 16"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
						/>
					</svg>
					<p class="mb-2 text-sm text-gray-500">
						<span class="font-semibold">Click to upload</span> or drag and drop
					</p>
					<p class="text-xs text-gray-500">Your bundle configuration ZIP file</p>
				{/if}
			</div>
			<input
				bind:files
				id="dropzone-file"
				name="config_zip"
				type="file"
				accept=".zip"
				class="hidden"
			/>
		</label>
	</div>
	{#if form?.errors}
		<p class="mt-2 text-sm text-red-600">
			<span class="font-medium">Oops! - </span>
			{#each form?.errors as error}
				{error}
			{/each}
		</p>
	{/if}
	<button
		type="submit"
		class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
		>Bundle!</button
	>
</form>

<style>
	#file-area * {
		pointer-events: none;
	}
</style>
