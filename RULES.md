# 🚨 KOODE-CLI RULES - AI-Powered CLI Development

**IMPORTANTE:** Seja EXTREMAMENTE HONESTO SEMPRE em relação à situação do projeto. Nunca inicie algo antes de ter 95% de certeza. Não faça nenhuma alteração antes que você tenha 95% de confiança sobre o que deve ser construído. Faça perguntas até ter certeza absoluta.

## 🎯 **FUNDAMENTAL CLI DEVELOPMENT RULES**

### **95% CONFIDENCE RULE FOR CLI DEVELOPMENT**

- ✅ **MUST**: Validate EACH feature with 95%+ confidence before implementing in the CLI
- ✅ **MUST**: Ask questions until absolutely certain about CLI requirements
- ✅ **MUST**: Stop and obtain specific evidence if any feature validation fails
- ❌ **MUST NOT**: Start any CLI feature without 95% confidence
- ❌ **MUST NOT**: Assume requirements or make speculative interpretations about CLI needs
- ❌ **MUST NOT**: Continue without complete validation of feature inputs

### **FAIL-FAST VALIDATION PRINCIPLE**

**ALWAYS detect errors and invalid conditions as early as possible and immediately halt execution:**

- ✅ **MUST**: Validate data at the earliest possible point (input, function start, process beginning)
- ✅ **MUST**: Immediately halt execution when validation fails (throw exceptions, return errors)
- ✅ **MUST**: Provide specific error messages indicating problem nature and resolution
- ✅ **MUST**: Prevent invalid data from propagating through system
- ✅ **MUST**: Implement UI validation with immediate user feedback
- ✅ **MUST**: Validate API requests before processing to protect backend
- ✅ **MUST**: Apply domain logic validation to maintain data integrity
- ✅ **MUST**: Use early prototypes and feedback loops in development
- ❌ **MUST NOT**: Allow invalid data to continue processing
- ❌ **MUST NOT**: Attempt recovery with corrupted/invalid states
- ❌ **MUST NOT**: Provide generic or unclear error messages
- ❌ **MUST NOT**: Skip validation for performance reasons

### **EXTREME HONESTY ABOUT CLI STATUS**

- ✅ **MUST**: Be EXTREMELY HONEST about CLI development progress
- ✅ **MUST**: Report CLI problems and limitations immediately
- ✅ **MUST**: Communicate clearly when there's insufficient certainty about requirements
- ❌ **MUST NOT**: Mask CLI issues or give false guarantees about functionality
- ❌ **MUST NOT**: Proceed without communicating identified risks in development
- ❌ **MUST NOT**: Give vague or evasive responses about development status

### **🔍 CODEBASE ANALYSIS OBRIGATÓRIA - REGRA CRÍTICA**

**ANTES DE CRIAR QUALQUER COMPONENTE, MÓDULO OU FEATURE:**

- ✅ **OBRIGATÓRIO**: Analisar o codebase existente PRIMEIRO usando Glob/Grep/Read tools
- ✅ **OBRIGATÓRIO**: Verificar se o componente/módulo JÁ EXISTE no projeto
- ✅ **OBRIGATÓRIO**: Se existe: EVOLUIR o existente, NUNCA criar duplicado
- ✅ **OBRIGATÓRIO**: Se não existe: Verificar padrões similares para seguir
- ✅ **OBRIGATÓRIO**: Documentar análise realizada: "Analisado X arquivos, encontrado Y similar"
- ✅ **OBRIGATÓRIO**: Justificar decisão: "Evoluindo Z existente" OU "Criando novo porque..."
- ❌ **PROIBIDO**: Criar componentes/módulos sem análise prévia do codebase
- ❌ **PROIBIDO**: Duplicar funcionalidades existentes sem justificativa extrema
- ❌ **PROIBIDO**: Assumir que algo não existe sem verificação completa

**PROCESSO DE VALIDAÇÃO OBRIGATÓRIO:**

1. **BUSCAR PRIMEIRO**: `Glob "**/*.{ts,tsx}"` + `Grep "FeatureName"` + `Read similares`
2. **ANALISAR EXISTENTES**: Verificar funcionalidades, interfaces, padrões
3. **DECIDIR**: Evoluir existente OU criar novo (com justificativa)
4. **DOCUMENTAR**: "Análise: X módulos encontrados, evolução Y aplicada"
5. **IMPLEMENTAR**: Seguir padrões identificados na análise

## 🏗️ **CLI ARCHITECTURE & TECHNOLOGY RULES**

### **CLI FOUNDATION REQUIREMENTS**

- ✅ **DEVE**: Usar EXCLUSIVAMENTE TypeScript + Ink (React for CLI) + Node.js
- ✅ **DEVE**: Seguir arquitetura existente com componentes modulares
- ✅ **DEVE**: Implementar integração com OpenAI API para funcionalidades de IA
- ✅ **DEVE**: Usar meow para CLI parsing + cross-spawn para execução de comandos
- ✅ **DEVE**: Manter compatibilidade com sistemas Unix e Windows
- ❌ **NÃO DEVE**: Sugerir outras tecnologias ou frameworks base
- ❌ **NÃO DEVE**: Criar arquiteturas que quebrem a estrutura atual
- ❌ **NÃO DEVE**: Ignorar padrões de CLI estabelecidos

### **CLI MODE - DEVELOPER FOCUSED**

- 🔴 **FATO CRÍTICO**: CLI é focado em desenvolvedores e produtividade
- 🔴 **FATO CRÍTICO**: Modo Developer: Assistência de IA para coding e automação
- ✅ **DEVE**: Configurar API keys via variáveis de ambiente ou flags
- ✅ **DEVE**: Prover interface interativa intuitiva com comandos slash
- ✅ **DEVE**: UI sempre focada em developer experience e produtividade
- ✅ **DEVE**: Manter sessões de conversa e histórico de comandos
- ✅ **DEVE**: Implementar integração com OpenAI de forma segura
- ❌ **NÃO DEVE**: Misturar funcionalidades desnecessárias no CLI
- ❌ **NÃO DEVE**: Quebrar a simplicidade e foco do CLI
- ❌ **NÃO DEVE**: Ignorar princípios de CLI design estabelecidos

### **PADRÕES TÉCNICOS CLI OBRIGATÓRIOS**

- ✅ **DEVE**: Seguir padrões do CLI para qualquer funcionalidade:
  - Input Pattern: useInput hook para captura de entrada do usuário
  - Command Pattern: Comandos slash para funcionalidades especiais
  - State Pattern: useState para gerenciar estado da aplicação
- ✅ **DEVE**: Implementar error handling adequado em todas as operações
- ✅ **DEVE**: Usar componentes Ink (Box, Text) para UI consistency
- ✅ **DEVE**: Aplicar typing TypeScript rigoroso em todos os módulos
- ✅ **DEVE**: Manter separation of concerns entre UI e lógica de negócio
- ❌ **NÃO DEVE**: Criar componentes sem proper typing
- ❌ **NÃO DEVE**: Quebrar patterns de input handling estabelecidos
- ❌ **NÃO DEVE**: Implementar UI fora dos padrões Ink

## 📝 **REGRAS DE DOCUMENTAÇÃO**

### **TERMINOLOGIA PADRONIZADA**

- ✅ **DEVE**: Usar "features" para funcionalidades do CLI
- ✅ **DEVE**: Usar "commands" para comandos disponíveis
- ✅ **DEVE**: Usar "components" para elementos UI reutilizáveis
- ✅ **DEVE**: Manter consistência terminológica entre módulos
- ❌ **NÃO DEVE**: Usar "widgets" para componentes CLI
- ❌ **NÃO DEVE**: Misturar terminologia técnica e funcional
- ❌ **NÃO DEVE**: Criar terminologia nova sem validação

### **EXEMPLOS DE USO CLI**

- ✅ **DEVE**: Usar exemplos de desenvolvimento: Code review, debugging, refactoring
- ✅ **DEVE**: Usar exemplos de automação: Build scripts, testing, deployment
- ✅ **DEVE**: Incluir comandos práticos, error handling e user feedback
- ✅ **DEVE**: Demonstrar features principais (/help, /clear, /exit)
- ✅ **DEVE**: Mostrar integração com OpenAI de forma segura
- ❌ **NÃO DEVE**: Usar exemplos genéricos sem contexto prático
- ❌ **NÃO DEVE**: Criar exemplos sem proper error handling
- ❌ **NÃO DEVE**: Ignorar segurança na manipulação de API keys

## 🔄 **REGRAS DE PROCESSO**

### **METODOLOGIA INCREMENTAL**

- ✅ **DEVE**: Organizar por features completas end-to-end
- ✅ **DEVE**: Priorizar entrega de valor ao desenvolvedor
- ✅ **DEVE**: Implementar comandos incrementalmente
- ✅ **DEVE**: Validar cada feature antes da próxima
- ❌ **NÃO DEVE**: Organizar por camadas técnicas (horizontal)
- ❌ **NÃO DEVE**: Criar implementações complexas de uma vez
- ❌ **NÃO DEVE**: Priorizar elegância técnica sobre usabilidade

### **VALIDAÇÕES OBRIGATÓRIAS**

- ✅ **DEVE**: Executar validações técnicas completas antes de cada feature
- ✅ **DEVE**: Parar imediatamente se qualquer validação falhar
- ✅ **DEVE**: Obter evidências concretas antes de prosseguir
- ✅ **DEVE**: Documentar critérios de aceite específicos
- ❌ **NÃO DEVE**: Pular validações por pressão de tempo
- ❌ **NÃO DEVE**: Aceitar validações superficiais ou genéricas
- ❌ **NÃO DEVE**: Continuar sem evidências suficientes

### **CHANGELOG OBRIGATÓRIO POR FEATURE**

- ✅ **DEVE**: Gerar entrada no CHANGELOG.md para CADA feature finalizada
- ✅ **DEVE**: Criar changelog na raiz do projeto (formato Keep a Changelog)
- ✅ **DEVE**: Incluir categorias: Added, Changed, Fixed, Security
- ✅ **DEVE**: Referenciar feature específica ([FEATURE X.Y]) em cada entrada
- ✅ **DEVE**: Usar versionamento semântico (MAJOR.MINOR.PATCH)
- ✅ **DEVE**: Documentar comandos e funcionalidades em linguagem clara
- ✅ **DEVE**: Incluir exemplos de uso para desenvolvedores
- ✅ **DEVE**: Gerar changelog IMEDIATAMENTE após feature completa
- ❌ **NÃO DEVE**: Finalizar feature sem entrada no changelog
- ❌ **NÃO DEVE**: Usar linguagem técnica excessiva para usuários
- ❌ **NÃO DEVE**: Omitir implicações de segurança quando aplicáveis

### **ATUALIZAÇÃO STATUS PROJETO OBRIGATÓRIA**

- ✅ **DEVE**: Atualizar status no README.md para CADA feature completada
- ✅ **DEVE**: Marcar feature como "✅ IMPLEMENTED (DD/MM/AAAA)" na documentação
- ✅ **DEVE**: Atualizar progresso do milestone pai quando aplicável
- ✅ **DEVE**: Incluir data de conclusão e status de testes
- ✅ **DEVE**: Atualizar IMEDIATAMENTE após validação final da feature
- ❌ **NÃO DEVE**: Considerar feature completa sem atualização da documentação
- ❌ **NÃO DEVE**: Deixar features implementadas com status desatualizado
- ❌ **NÃO DEVE**: Atualizar documentação sem validação completa da funcionalidade

## 🚫 **PROIBIÇÕES CRÍTICAS**

### **NUNCA FAZER**

- ❌ **NUNCA** criar features fora dos padrões estabelecidos
- ❌ **NUNCA** sugerir tecnologias diferentes da stack definida
- ❌ **NUNCA** ignorar typing TypeScript rigoroso
- ❌ **NUNCA** criar componentes sem seguir padrões Ink
- ❌ **NUNCA** usar terminologia inconsistente entre módulos
- ❌ **NUNCA** prosseguir sem 95% de certeza
- ❌ **NUNCA** mascarar problemas ou limitações
- ❌ **NUNCA** criar módulos ou arquivos fora do padrão estabelecido

### **EVOLUÇÃO VS CRIAÇÃO**

- ✅ **SEMPRE** evoluir módulos existentes
- ✅ **SEMPRE** seguir padrões já estabelecidos
- ✅ **SEMPRE** manter coesão com componentes anteriores
- ❌ **NUNCA** criar novos padrões sem aprovação
- ❌ **NUNCA** reinventar soluções já definidas
- ❌ **NUNCA** quebrar compatibilidade com arquitetura existente

## 🎯 **CRITÉRIOS DE QUALIDADE**

### **CHECKLIST OBRIGATÓRIO ANTES DE ENTREGAR**

- [ ] **95% de certeza** sobre todos os requisitos
- [ ] **Validações técnicas** todas executadas e aprovadas
- [ ] **Terminologia consistente** com outros módulos
- [ ] **TypeScript typing** implementado corretamente
- [ ] **Padrões Ink** seguidos rigorosamente
- [ ] **Padrões técnicos** adaptados apropriadamente
- [ ] **Exemplos práticos** específicos incluídos
- [ ] **Features end-to-end** documentadas
- [ ] **Coesão com componentes** anteriores mantida
- [ ] **Documentação executável** validada

### **RED FLAGS - PARAR IMEDIATAMENTE**

- 🚨 Sugestão de tecnologia fora da stack definida
- 🚨 Componentes sem seguir padrões Ink propostos
- 🚨 Features fora dos padrões estabelecidos
- 🚨 Terminologia inconsistente detectada
- 🚨 Validações falhando ou sendo puladas
- 🚨 Requisitos assumidos sem confirmação
- 🚨 Quebra de coesão com componentes anteriores
- 🚨 Documentação não executável
- 🚨 Exemplos genéricos sem contexto prático específico

## 📊 **RESPONSABILIDADES**

## 🔄 **FLUXO DE VALIDAÇÃO**

### **ENTRADA DE CADA**

### **SAÍDA DE CADA AGENTE**

## 🎯 **OBJETIVO FINAL**

**Manter Koode CLI - AI-Powered CLI Tool com:**

- **99% coesão** técnica entre componentes
- **100% aproveitamento** da arquitetura Ink + TypeScript
- **100% integration** com OpenAI API de forma segura
- **100% executabilidade** documentação técnica
- **100% developer experience** focado em produtividade

---

## 🚨 **LEMBRETE CRÍTICO**

**Estas regras são OBRIGATÓRIAS e NÃO NEGOCIÁVEIS. Qualquer violação compromete a integridade do Koode CLI.**

**SEMPRE seguir: 95% certeza → Validações completas → Padrões TypeScript/Ink → Developer Experience → Coesão 99%**
