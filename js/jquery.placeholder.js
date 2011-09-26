(function($) {
  /**
   * Spoofs placeholders in browsers that don't support them (eg Firefox 3)
   * 
   * Copyright 2011 Dan Bentley
   * Licensed under the Apache License 2.0
   *
   * Author: Dan Bentley [github.com/danbentley]
   * Refactored by: Jayphen [github.com/jayphen]
   */

  // Return if native support is available.
  if ("placeholder" in document.createElement("input")) return;

  $("input[placeholder]").each(function() {
    var self = $(this),
      holder = self.attr('placeholder');

    self.bind('init.placeholder', function() {
      self.val() === '' ? self.val(holder).addClass('placeholder') : self.data('changed', true).removeClass('placeholder');
    })

    .bind('submitCheck.placeholder', function() {
      if (self.data('changed')) return;
      if (self.val() === holder) self.val('');
    })

    .bind('focus.placeholder', function() {
      self.removeClass('placeholder').trigger('submitCheck.placeholder');
    })

    .bind('blur.placeholder', function() {
      self.trigger('init.placeholder');
    })

    .bind('change.placeholder', function() {
      self.data('changed', self.val() !== '');
    });

  }).trigger('init.placeholder');

  $('form').has("input[placeholder]").bind('submit', function(e) {
    $(this).find("input[placeholder]").trigger('submitCheck.placeholder');
  });
})(jQuery);
