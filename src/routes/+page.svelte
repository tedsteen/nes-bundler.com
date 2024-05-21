<script>
	/** @type {import('./$types').ActionData} */
	export let form;
</script>
<svelte:head>
    <title>NES Bundler</title>
</svelte:head>
<h1 class="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">NES Bundler</h1>
<p class="mb-5 text-center">
Enter your email and drop your bundle configuration ZIP and we'll email you the finished bundles!
<br />
For details look here: <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="https://github.com/tedsteen/nes-bundler">https://github.com/tedsteen/nes-bundler</a>
</p>

<form method="POST" enctype="multipart/form-data" action="?/bundle" class="max-w-sm mx-auto">
    <div class="mb-5">
        <input name="recipient_email" type="email" value={form?.recipient_email ?? ''} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your@email.com" required />
    </div>
    <div class="flex items-start mb-5">
        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Your bundle configuration ZIP file</p>
            </div>
            <input id="dropzone-file" name="config_zip" type="file" accept=".zip" class="hidden" />
        </label>
    </div>
    {#if form?.errors}
        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
        <span class="font-medium">Oops! - </span>
            {#each form?.errors as error}
                {error}
            {/each}
        </p>
    {/if}
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Bundle!</button>
</form>
