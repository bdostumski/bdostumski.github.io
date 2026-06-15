;;; build-site.el --- Publish Org-based site with Doom Emacs  -*- lexical-binding: t; -*-
;;
;; Copyright (C) 2026 Borislav Dostumski
;;
;; Author: Borislav Dostumski <b.dostumski@gmail.com>
;; Maintainer: Borislav Dostumski <b.dostumski@gmail.com>
;; Created: 2026-02-06
;; Version: 0.0.1
;; Keywords: docs, tools
;; Homepage: https://bdostumski.github.io/
;; Package-Requires: ((emacs "29.1"))
;;
;; This file is not part of GNU Emacs.
;;
;;; Commentary:
;;
;; Simple site builder using org-publish, suitable for Doom 3.x / Emacs 30.x.
;;
;;; Code:

;; Prepare publishing system
(require 'package)
(setq package-user-dir (expand-file-name "./.packages"))
(setq package-archives '(("melpa" . "https://melpa.org/packages/")
                         ("elpa" . "https://elpa.gnu.org/packages/")))

;; Initialize the package system
(package-initialize)
(unless package-archive-contents
  (package-refresh-contents))

;; Install dependencies
(package-install 'htmlize)

;; Load the publishing system
(require 'ox-publish)

;; Allow babel evaluation without prompting (we trust our own org files)
(setq org-confirm-babel-evaluate nil)

;; Customize the HTML output
(setq org-html-validation-link nil
      org-html-head-include-scripts nil
      org-html-head-include-default-style nil)

(setq org-publish-project-alist
      `(
        ("site-org"
         :base-directory "./org"
         :base-extension "org"
         :publishing-directory "./public"
         :recursive t
         :publishing-function org-html-publish-to-html
         :with-author nil
         :with-creator nil
         :with-toc nil
         :section-numbers nil
         :time-stamp-file nil
         :html-doctype "html5"
         :html-html5-fancy t
         :html-head-include-scripts nil
         :html-head-include-default-style nil
         :html-head
         ,(concat
           "<link rel=\"stylesheet\" href=\"/static/css/style.css\" type=\"text/css\"/>\n"
           "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css\"/>\n"
           "<script defer src=\"/static/js/doom.js\"></script>")
         :html-postamble nil)

        ("site-static"
         :base-directory "./static"
         :base-extension "css\\|js\\|png\\|jpg\\|jpeg\\|gif\\|svg\\|ico"
         :publishing-directory "./public/static"
         :recursive t
         :publishing-function org-publish-attachment)

        ("site" :components ("site-org" "site-static"))))

;; Force re-publish while debugging
(setq org-publish-use-timestamps-flag nil)

;; Generate the site output
(org-publish-all t)

(message "Build complete!")

(provide 'build-site)
;;; build-site.el ends here
