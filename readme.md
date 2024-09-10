# Install

install dependencies

```powershell
pnpm install
```

generate prisma client

```powershell
cd src/apps/backend

pnpm prisma:generate
```

push model to database

```powershell
pnpm prisma:push
```

add required data to database

```powershell
pnpm prisma:seed
```

run backend dev server

```powershell
pnpm dev
```

run frontend dev server

```powershell
cd src/apps/frontend

pnpm dev
```

## Tasks

### Frontend

- [x] init frontend
- [x] angular material
- [x] ngrx
  - [x] store
  - [x] effects
  - [x] dev-tools
- [x] loading component
- [x] recipe-list page
  - [x] recipe component
  - [x] filter recipes
  - [ ] search recipes
  - [ ] print recipe action to save as pdf
  - [ ] pagination
- [ ] recipe-detail page (WIP)
  - [x] ingredients
  - [x] steps
  - [x] ingredients with checkboxes to cross font
  - [ ] action buttons
- [x] recipe-create page
- [x] recipe-edit page
- [x] show back button
- [x] show login/register and logout buttons
- [ ] add new angular material dark theme
- [ ] recipe duration

### Backend

- [x] rights to create, update and delete a recipe
  - [ ] include token with jwt
- [ ] recipe duration

### Both

- [ ] packages/types
