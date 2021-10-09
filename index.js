const { NuxtApp } = require('@keystonejs/app-nuxt');
const { Keystone } = require('@keystonejs/keystone');
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { Relationship, Slug, Select, Text, Password } = require('@keystonejs/fields');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { Markdown } = require('@keystonejs/fields-markdown');
const keystone = new Keystone({
  adapter: new MongooseAdapter({ mongoUri: 'mongodb://localhost/keystone' }),
});

keystone.createList('User', {
  fields: {
    name: { type: Text, isRequired: true},
    email: { type: Text },
    password: { type: Password, isRequired: true },
    role: { type: Select, options: "Admin,Author" },
    // posts: {type:Relationship,ref:'Post',many: true}
  },
});


keystone.createList('Post', {
  fields: {
    title: { type: Text, isRequired: true },
    summary:{ type: Text},
    slug: { type: Slug, from: "title" },
    content: { type: Markdown },
    author: { type: Relationship, ref: 'User', many: false ,isRequired:true},
    status: {
      type: Select, options: [
        { value: 'PUB', label: 'Published' },
        { value: 'UN_PUB', label: 'Unpublished' }
      ]
    }

  }
})

const config = {
  srcDir: 'src',
  buildDir: 'dist',
};

module.exports = {
  keystone,
  apps: [new GraphQLApp(), new AdminUIApp(), new NuxtApp(config)],
};
