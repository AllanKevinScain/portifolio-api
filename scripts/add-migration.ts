import { execSync } from 'child_process';

const name = process.argv[2];

if (!name) {
  console.error('❌ Informe o nome da migration');
  process.exit(1);
}

execSync(`npx typeorm migration:create ./src/migration/${name}`, {
  stdio: 'inherit',
});
