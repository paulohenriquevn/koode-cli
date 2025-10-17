# 🐛 Debug koode-cli no VSCode

## 🎯 **Como Executar Debug com Attach**

### **Método 1: Attach Direto (Recomendado)**

1. **Abra o terminal no VSCode** (`Ctrl + '`)

2. **Execute o comando para iniciar com debug:**

   ```bash
   # Para debug normal (porta 9229)
   node --inspect=9229 dist/start.js --debug "seu prompt aqui"

   # Para debug com breakpoint automático (porta 9230)
   node --inspect-brk=9230 dist/start.js --debug "seu prompt aqui"
   ```

3. **No VSCode, vá para Debug Panel** (`Ctrl + Shift + D`)

4. **Selecione uma das configurações:**

   - `🔗 Attach to koode-cli (Port 9229)` - Para attach normal
   - `🔗 Attach to koode-cli (Port 9230 - Breakpoint)` - Para attach com breakpoint

5. **Clique no botão Play** ▶️ ou pressione `F5`

---

### **Método 2: Launch Direto**

1. **No VSCode, vá para Debug Panel** (`Ctrl + Shift + D`)

2. **Selecione uma das configurações de Launch:**

   - `🚀 Launch koode-cli (Debug)` - Para executar arquivo compilado
   - `⚡ Launch koode-cli (TypeScript Direct)` - Para executar TypeScript diretamente

3. **Clique no botão Play** ▶️ ou pressione `F5`

---

## 🔧 **Comandos de Terminal para Debug**

```bash
# 1. Debug normal - attach na porta 9229
node --inspect=9229 dist/start.js --debug "teste attach"

# 2. Debug com breakpoint automático - porta 9230
node --inspect-brk=9230 dist/start.js --debug "teste breakpoint"

# 3. Debug em background
node --inspect=9229 dist/start.js --debug "background test" &

# 4. Verificar processos de debug rodando
ps aux | grep "node --inspect" | grep -v grep

# 5. Matar processos de debug
pkill -f "node --inspect"
```

---

## 🎯 **Configurações Disponíveis**

| Nome                 | Tipo   | Porta | Descrição                         |
| -------------------- | ------ | ----- | --------------------------------- |
| 🔗 Attach Port 9229  | Attach | 9229  | Conecta a processo já rodando     |
| 🔗 Attach Port 9230  | Attach | 9230  | Conecta com breakpoint automático |
| 🚀 Launch Debug      | Launch | -     | Inicia arquivo compilado (.js)    |
| ⚡ Launch TypeScript | Launch | -     | Inicia TypeScript direto (.tsx)   |

---

## 🚨 **Troubleshooting**

### **Problema: "Cannot connect to runtime process"**

```bash
# Verificar se processo está rodando
ps aux | grep "node --inspect"

# Se não estiver, iniciar:
node --inspect=9229 dist/start.js --debug "teste"
```

### **Problema: "Port already in use"**

```bash
# Matar processos na porta
pkill -f "node --inspect"

# Ou usar porta diferente
node --inspect=9231 dist/start.js --debug "teste"
```

### **Problema: "Source maps não funcionam"**

```bash
# Recompilar com source maps
npx tsc --sourceMap

# Ou usar configuração TypeScript Direct
```

---

## ✅ **Processo Completo de Debug**

1. **Compile o projeto:**

   ```bash
   npm run build
   ```

2. **Inicie o processo com debug:**

   ```bash
   node --inspect-brk=9230 dist/start.js --debug "meu teste"
   ```

3. **No VSCode:**

   - Abra Debug Panel (`Ctrl + Shift + D`)
   - Selecione `🔗 Attach to koode-cli (Port 9230 - Breakpoint)`
   - Pressione `F5`

4. **Adicione breakpoints** clicando na margem esquerda do código

5. **Debug funcionando!** 🎉

---

## 🎯 **Dicas Avançadas**

- **F5**: Continue execution
- **F10**: Step over
- **F11**: Step into
- **Shift+F11**: Step out
- **Ctrl+Shift+F5**: Restart debugger

**Status atual**: Processos rodando nas portas 9229 e 9230 prontos para attach!
