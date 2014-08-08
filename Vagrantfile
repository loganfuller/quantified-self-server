Vagrant.configure("2") do |config|
    config.vm.box = "precise64"
    config.vm.box_url = "http://files.vagrantup.com/precise64.box"
    config.vm.hostname = "localhost"
    config.vm.synced_folder "./", "/usr/lib/node_modules/quantified-self-server"
    config.vm.network :forwarded_port, guest: 8080, host: 8181, auto_correct: true
end
