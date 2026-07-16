import { GITHUB_PAT } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	bundle: async ({ request }) => {
		const data = await request.formData();
		const config_zip = data.get('config_zip');
		const recipient_email = data.get('recipient_email');
		if (!(config_zip instanceof File)) {
			return fail(400, { recipient_email, errors: ['config_zip is not a file'] });
		}

		/** @type {string[]} */
		const errors = [];
		if (!config_zip.size) {
			errors.push('Bundle ZIP is missing');
		}
		if (!recipient_email) {
			errors.push('Recipient email is missing');
		}
		if (errors.length > 0) {
			return fail(400, { recipient_email, errors });
		}

		try {
			const bin_id = `bundle-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

			const upload_res = await fetch('https://filebin.net', {
				method: 'POST',
				headers: {
					bin: bin_id,
					filename: 'config.zip'
				},
				body: config_zip
			});

			if (!upload_res.ok) {
				throw new Error(`filebin.net returned ${upload_res.status}`);
			}

			const configuration_url = `https://filebin.net/${bin_id}/config.zip`;

			await fetch('https://api.github.com/repos/tedsteen/nes-bundler/dispatches', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${GITHUB_PAT}`,
					Accept: 'application/vnd.github.v3+json',
					'X-GitHub-Api-Version': '2022-11-28'
				},
				body: JSON.stringify({
					event_type: 'bundle',
					client_payload: {
						configuration_url,
						recipient_email
					}
				})
			});
		} catch (error) {
			console.error('failure', error);
			return fail(400, {
				recipient_email,
				errors: [
					'Failed to submit the bundle request. Try again later or file an issue at https://github.com/tedsteen/nes-bundler'
				]
			});
		}
		return redirect(303, '/bundle-requested');
	}
};
