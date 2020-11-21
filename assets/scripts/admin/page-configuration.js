jQuery(document).ready(function ($) {
    const $container = $('.shop1-dropshipping-configurations-container');
    const $testConnection = $container.find('.testing');

    if ($testConnection.length) {
        $.get(window.ajaxurl, {
            action: 'shop1-test-connection',
        }, null, 'json').done(function (data) {
            if (data.success) {
                if (data.data.code === 'not_authenticated' || data.data.code === 'not_found') {
                    $testConnection.hide();
                    $container.find('.not-connected').show();
                } else if (data.data.code === 'verified_successfully') {
                    $testConnection.hide();
                    $container.find('.connected').show().find('.email').text(data.data.user_email);
                }
            } else {
                $testConnection.find('p:not(.error)').hide();
                $testConnection.find('p.error').show();
            }
        }).fail(function () {
            $testConnection.find('p:not(.error)').hide();
            $testConnection.find('p.error').show();
        }).always(function () {
            $testConnection.find('.spinner').removeClass('is-active');
        });
    }

    $container.find('.connected button.disconnect').on('click', function (e) {
        if (confirm("Are you sure you'd like to disconnect your Shop1 account?")) {
            $(this).text('Disconnecting...').prop('disabled', true);
            $.get(window.ajaxurl, {
                action: 'shop1-disconnect',
            }, null, 'json').done(function (data) {
                if (data && data.success && data.data.code === 'disconnected') {
                    window.location.reload();
                }
            }).fail(function () {
                console.error('This failed miserably');
            });
        }
        return false;
    });
});