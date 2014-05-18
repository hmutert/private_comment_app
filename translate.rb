#!/usr/bin/env ruby
en = "translations/en.json"
(Dir["translations/*"] - [en]).each { |f| system("rm #{f}") }

["da", "fr", "it", "ja", "ko", "nl", "pt", "ru", "zh", "de", "es"].each do |lang|
  puts `autolang #{ENV['API_KEY'] || raise("API_KEY")} #{en} #{lang}`
end
