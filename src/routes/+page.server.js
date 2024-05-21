import { GITHUB_PAT } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';

const bashupload_file_url = /wget (.*)/;
/** @type {import('./$types').Actions} */
export const actions = {
	bundle: async ({ request }) => {
        const data = await request.formData();
        const config_zip = data.get('config_zip');
		const recipient_email = data.get('recipient_email');
        let errors = [];
        if (!config_zip.size) {
            errors.push("Bundle ZIP is missing");
        }
        if (!recipient_email) {
            errors.push("Recipient email is missing");
        }

        if (errors.length > 0) {
            return fail(400, { recipient_email, errors});
        }
        return fetch('https://bashupload.com/config.zip', {
            method: 'PUT',
            body: config_zip?.stream(),
            duplex: 'half',
        })
        .then(res => res.text())
        .then(body => {
            const configuration_url = body.match(bashupload_file_url)?.[1];
            return fetch('https://api.github.com/repos/tedsteen/nes-bundler/dispatches', {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${GITHUB_PAT}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'X-GitHub-Api-Version':'2022-11-28',
                },
                body: JSON.stringify({
                    event_type: "bundle",
                    client_payload: {
                        configuration_url,
                        recipient_email
                    }
                })
            });
        }).catch((error) => {
            console.error("failure", error);
            return fail(400, { errors: ["Failed to submit the bundle request. Try again later or file an issue at https://github.com/tedsteen/nes-bundler"]});
        }).then(res => {
            return redirect(303, '/bundle-requested');
        });
	}
};