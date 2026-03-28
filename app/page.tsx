"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Shield,
  Zap,
  Eye,
  Wrench,
  ArrowRight,
  ChevronDown,
  Search,
  Brain,
  Settings,
  Layers,
  Clock,
  AlertTriangle,
  Users,
  CheckCircle,
  TrendingDown,
  Gauge,
  Infinity,
} from "lucide-react"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

// Componente de partículas animadas
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(16, 185, 129, ${particle.opacity})`
        ctx.fill()

        // Conectar partículas próximas
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x
          const dy = particles[j].y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      })

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    resize()
    createParticles()
    drawParticles()

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

export default function ACILandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const problemSectionRef = useRef<HTMLDivElement>(null)
  const solutionSectionRef = useRef<HTMLDivElement>(null)
  const howItWorksSectionRef = useRef<HTMLDivElement>(null)
  const benefitsSectionRef = useRef<HTMLDivElement>(null)
  const visionSectionRef = useRef<HTMLDivElement>(null)
  const ctaSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero animations
    const heroTimeline = gsap.timeline()
    heroTimeline
      .fromTo(
        ".hero-badge",
        { opacity: 0, y: -40, scale: 0.5 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)" }
      )
      .fromTo(
        ".hero-title",
        { opacity: 0, y: 80, scale: 0.6 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" },
        "-=0.6"
      )
      .fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.7"
      )
      .fromTo(
        ".hero-buttons",
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.7)" },
        "-=0.5"
      )
      .fromTo(
        ".hero-scroll",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )

    // Problem section animations - MAIS IMPACTANTES
    gsap.fromTo(
      ".problem-intro",
      { opacity: 0, y: 100, scale: 0.7 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".problem-intro",
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      ".problem-card",
      { opacity: 0, y: 120, scale: 0.6, rotateX: 15 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".problem-cards",
          start: "top 85%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    )

    // Stats section - IMPACTO DRAMÁTICO
    gsap.fromTo(
      ".stats-title",
      { opacity: 0, y: 80, scale: 0.6 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      ".stat-item",
      { opacity: 0, y: 100, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        stagger: 0.15,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )

    // Solution section - "DE FERRAMENTA PARA INFRAESTRUTURA"
    gsap.fromTo(
      ".solution-badge",
      { opacity: 0, scale: 0.3 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.4)",
        scrollTrigger: {
          trigger: ".solution-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      ".solution-title",
      { opacity: 0, y: 100, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".solution-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      ".solution-box",
      { opacity: 0, x: -100, scale: 0.6, rotateY: -20 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotateY: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".solution-comparison",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      ".solution-arrow",
      { opacity: 0, scale: 0, rotate: -180 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: ".solution-comparison",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      ".solution-box-after",
      { opacity: 0, x: 100, scale: 0.6, rotateY: 20 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotateY: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".solution-comparison",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )

    // Feature cards - INFRAESTRUTURA
    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 120, scale: 0.5, rotateX: 20 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1.3,
        stagger: 0.18,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".feature-cards",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    )

    // How it works section - 4 ETAPAS COM MAIS IMPACTO
    gsap.fromTo(
      ".how-badge",
      { opacity: 0, scale: 0.2, rotate: -30 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.4)",
        scrollTrigger: {
          trigger: ".how-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      ".how-title",
      { opacity: 0, y: 100, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".how-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      ".step-item",
      { opacity: 0, x: (index) => (index % 2 === 0 ? -150 : 150), scale: 0.5, rotateY: (index) => (index % 2 === 0 ? -30 : 30) },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotateY: 0,
        duration: 1.4,
        stagger: 0.25,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".steps-container",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    )

    // Benefits section - RESULTADOS QUE IMPORTAM
    gsap.fromTo(
      ".benefits-badge",
      { opacity: 0, scale: 0.2 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: "elastic.out(1, 0.4)",
        scrollTrigger: {
          trigger: ".benefits-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      ".benefits-title",
      { opacity: 0, y: 100, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".benefits-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      ".benefit-card",
      { opacity: 0, y: 150, scale: 0.4, rotateX: 25 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1.3,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".benefit-cards",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    )

    // Vision section - IMAGINE UM MUNDO
    gsap.fromTo(
      ".vision-badge",
      { opacity: 0, scale: 0.2 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: "elastic.out(1, 0.4)",
        scrollTrigger: {
          trigger: ".vision-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      ".vision-title",
      { opacity: 0, y: 120, scale: 0.4 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".vision-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      ".vision-text",
      { opacity: 0, y: 80, scale: 0.7 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".vision-content",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )

    gsap.fromTo(
      ".vision-cta",
      { opacity: 0, y: 80, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.3,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".vision-cta",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    )

    // Final CTA section
    gsap.fromTo(
      ".final-cta",
      { opacity: 0, y: 120, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".final-cta",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    )

    // Footer animation
    gsap.fromTo(
      ".footer-content",
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-emerald-400">
            ACI
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#problema" className="text-gray-400 hover:text-white transition-colors">
              Problema
            </Link>
            <Link href="#solucao" className="text-gray-400 hover:text-white transition-colors">
              Solução
            </Link>
            <Link href="#como-funciona" className="text-gray-400 hover:text-white transition-colors">
              Como Funciona
            </Link>
            <Link href="#beneficios" className="text-gray-400 hover:text-white transition-colors">
              Benefícios
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
              Login
            </Link>
            <Link
              href="#comecar"
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-5 py-2.5 rounded-lg transition-all hover:scale-105"
            >
              Começar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
        <ParticleBackground />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="hero-badge inline-block mb-8 px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium">
            INFRAESTRUTURA AUTÔNOMA
          </div>
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="text-white">Compliance</span>
            <br />
            <span className="text-emerald-400">Autônomo</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            ACI monitora, detecta e corrige automaticamente.
            <br />
            Compliance não deveria ser um esforço. Deveria ser uma infraestrutura.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#comecar"
              className="group bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-8 py-4 rounded-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/demo"
              className="bg-transparent hover:bg-white/5 text-white font-semibold px-8 py-4 rounded-lg border border-white/20 transition-all hover:scale-105"
            >
              Ver Demonstração
            </Link>
          </div>
          <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
            <span className="text-sm">SCROLL</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problema" ref={problemSectionRef} className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="problem-intro text-center text-lg text-gray-400 mb-16">
            A cada dia, <span className="text-white font-semibold">organizações enfrentam os mesmos desafios</span> de
            compliance. E a cada dia, os mesmos problemas se repetem.
          </p>

          <div className="problem-cards grid md:grid-cols-2 gap-6 mb-24">
            <div className="problem-card p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Complexidade Exponencial</h3>
              <p className="text-gray-400 leading-relaxed">
                Sistemas estão se tornando complexos demais para serem gerenciados manualmente. Cada nova integração
                multiplica os pontos de falha.
              </p>
            </div>

            <div className="problem-card p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Processos Manuais</h3>
              <p className="text-gray-400 leading-relaxed">
                Compliance ainda depende de processos manuais, lentos e reativos. Quando você identifica um problema, já
                é tarde demais.
              </p>
            </div>

            <div className="problem-card p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Riscos Invisíveis</h3>
              <p className="text-gray-400 leading-relaxed">
                Vulnerabilidades permanecem invisíveis até se tornarem incidentes críticos. A falta de monitoramento
                contínuo cria pontos cegos perigosos.
              </p>
            </div>

            <div className="problem-card p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Humanos Não Escalam</h3>
              <p className="text-gray-400 leading-relaxed">
                Equipes de compliance não conseguem acompanhar o ritmo de crescimento dos sistemas. A cada sprint, a
                dívida técnica aumenta.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-section text-center mb-16">
            <h3 className="stats-title text-3xl md:text-4xl font-bold mb-4">
              E quando o sistema
              <br />
              <span className="text-emerald-400">falha?</span>
            </h3>
            <p className="text-gray-400 mb-3">
              Multas regulatórias. Vazamento de dados. Perda de confiança.
            </p>
            <p className="text-red-400 font-semibold mb-12">O custo de não estar em compliance é catastrófico.</p>

            <div className="stats-container grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="stat-item text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2">R$ 50M+</div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Multas LGPD</p>
              </div>
              <div className="stat-item text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2">78%</div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Empresas em Risco</p>
              </div>
              <div className="stat-item text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2">6 meses</div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Tempo Médio de Detecção</p>
              </div>
            </div>

            <div className="mt-16">
              <p className="text-gray-500 italic mb-2">{'"O problema não é falta de ferramentas."'}</p>
              <p className="text-xl text-white font-semibold">O problema é depender de processos humanos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solucao" ref={solutionSectionRef} className="solution-section py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="solution-badge inline-block mb-6 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium">
              A VIRADA
            </div>
            <h2 className="solution-title text-4xl md:text-5xl font-bold">
              De ferramenta
              <br />
              <span className="text-emerald-400">para infraestrutura</span>
            </h2>
          </div>

          <div className="solution-comparison flex flex-col md:flex-row items-center justify-center gap-8 mb-24">
            <div className="solution-box flex-1 max-w-md p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
              <div className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium mb-6">
                ANTES
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400">
                  <span className="text-red-400 mt-1">•</span>
                  Ferramentas fragmentadas que não se comunicam
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <span className="text-red-400 mt-1">•</span>
                  Equipes sobrecarregadas com tarefas manuais
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <span className="text-red-400 mt-1">•</span>
                  Compliance reativo e baseado em auditorias
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <span className="text-red-400 mt-1">•</span>
                  Riscos descobertos tarde demais
                </li>
              </ul>
            </div>

            <div className="solution-arrow w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
              <ArrowRight className="w-8 h-8 text-black" />
            </div>

            <div className="solution-box-after flex-1 max-w-md p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
                DEPOIS
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  Infraestrutura unificada e inteligente
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  Automação completa de processos
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  Compliance proativo e contínuo
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  Riscos detectados e corrigidos em tempo real
                </li>
              </ul>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-emerald-400">ACI</span>
              <span className="text-emerald-400">•</span>
            </div>
          </div>

          <div className="feature-cards grid md:grid-cols-4 gap-6">
            <div className="feature-card p-6 rounded-xl bg-[#111] border border-white/5 hover:border-emerald-500/30 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Infraestrutura, não ferramenta</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                ACI não é mais uma ferramenta no seu stack. É a camada fundamental que automatiza a sua compliance.
              </p>
            </div>

            <div className="feature-card p-6 rounded-xl bg-[#111] border border-white/5 hover:border-emerald-500/30 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Opera em segundo plano</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Funciona continuamente, 24/7, sem intervenção humana. Você configura uma vez e a infraestrutura trabalha
                por você.
              </p>
            </div>

            <div className="feature-card p-6 rounded-xl bg-[#111] border border-white/5 hover:border-emerald-500/30 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Inteligência autônoma</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Detecta padrões, aprende com seu ambiente e toma decisões em tempo real para manter você em compliance.
              </p>
            </div>

            <div className="feature-card p-6 rounded-xl bg-[#111] border border-white/5 hover:border-emerald-500/30 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wrench className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Correção automática</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Não apenas identifica problemas — resolve automaticamente antes que se tornem incidentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" ref={howItWorksSectionRef} className="how-section py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="how-badge inline-block mb-6 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium">
              COMO FUNCIONA
            </div>
            <h2 className="how-title text-4xl md:text-5xl font-bold">
              4 etapas.
              <br />
              <span className="text-emerald-400">Zero esforço.</span>
            </h2>
          </div>

          <div className="steps-container space-y-16">
            <div className="step-item flex items-start gap-8">
              <div className="relative">
                <div className="text-8xl font-bold text-emerald-500/10 absolute -top-4 -left-4">01</div>
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Eye className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-white">Monitoramento Contínuo</h3>
                <p className="text-gray-400 leading-relaxed max-w-xl">
                  ACI monitora toda a sua infraestrutura em tempo real. Cada sistema, cada conexão, cada fluxo de dados
                  é analisado continuamente.
                </p>
              </div>
            </div>

            <div className="step-item flex items-start gap-8 md:flex-row-reverse md:text-right">
              <div className="relative">
                <div className="text-8xl font-bold text-emerald-500/10 absolute -top-4 -right-4 md:-left-4 md:-right-auto">02</div>
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Search className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-white">Detecção de Riscos</h3>
                <p className="text-gray-400 leading-relaxed max-w-xl">
                  Algoritmos avançados identificam anomalias, vulnerabilidades e desvios de compliance antes que se
                  tornem problemas.
                </p>
              </div>
            </div>

            <div className="step-item flex items-start gap-8">
              <div className="relative">
                <div className="text-8xl font-bold text-emerald-500/10 absolute -top-4 -left-4">03</div>
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Brain className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-white">Análise Inteligente</h3>
                <p className="text-gray-400 leading-relaxed max-w-xl">
                  IA contextualiza cada risco, avalia impacto e prioriza ações. Você recebe insights acionáveis, não
                  apenas alertas.
                </p>
              </div>
            </div>

            <div className="step-item flex items-start gap-8 md:flex-row-reverse md:text-right">
              <div className="relative">
                <div className="text-8xl font-bold text-emerald-500/10 absolute -top-4 -right-4 md:-left-4 md:-right-auto">04</div>
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Settings className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-white">Correção Automática</h3>
                <p className="text-gray-400 leading-relaxed max-w-xl">
                  ACI executa correções automaticamente quando possível, ou orquestra workflows para ações que requerem
                  aprovação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" ref={benefitsSectionRef} className="benefits-section py-32 px-6 bg-gradient-to-b from-[#0d1117] to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="benefits-badge inline-block mb-6 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium">
              BENEFÍCIOS
            </div>
            <h2 className="benefits-title text-4xl md:text-5xl font-bold">
              Resultados que
              <br />
              <span className="text-emerald-400">importam</span>
            </h2>
          </div>

          <div className="benefit-cards grid md:grid-cols-4 gap-6">
            <div className="benefit-card p-8 rounded-2xl bg-[#111] border border-emerald-500/20 text-center hover:border-emerald-500/40 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-7 h-7 text-emerald-400" />
              </div>
              <div className="text-5xl font-bold text-emerald-400 mb-3">95%</div>
              <h3 className="text-lg font-semibold mb-2 text-white">Redução de Riscos</h3>
              <p className="text-sm text-gray-500">
                Menos incidentes de compliance com detecção e correção proativa de vulnerabilidades.
              </p>
            </div>

            <div className="benefit-card p-8 rounded-2xl bg-[#111] border border-emerald-500/20 text-center hover:border-emerald-500/40 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-7 h-7 text-emerald-400" />
              </div>
              <div className="text-5xl font-bold text-emerald-400 mb-3">60%</div>
              <h3 className="text-lg font-semibold mb-2 text-white">Redução de Custos</h3>
              <p className="text-sm text-gray-500">
                Economia em processos manuais, auditorias emergenciais e multas regulatórias.
              </p>
            </div>

            <div className="benefit-card p-8 rounded-2xl bg-[#111] border border-emerald-500/20 text-center hover:border-emerald-500/40 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Gauge className="w-7 h-7 text-emerald-400" />
              </div>
              <div className="text-5xl font-bold text-emerald-400 mb-3">10x</div>
              <h3 className="text-lg font-semibold mb-2 text-white">Velocidade Operacional</h3>
              <p className="text-sm text-gray-500">
                Mais rápido na resolução de issues de compliance com automação inteligente.
              </p>
            </div>

            <div className="benefit-card p-8 rounded-2xl bg-[#111] border border-emerald-500/20 text-center hover:border-emerald-500/40 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Infinity className="w-7 h-7 text-emerald-400" />
              </div>
              <div className="text-5xl font-bold text-emerald-400 mb-3">∞</div>
              <h3 className="text-lg font-semibold mb-2 text-white">Escalabilidade</h3>
              <p className="text-sm text-gray-500">
                Escale sua operação sem aumentar proporcionalmente sua equipe de compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section ref={visionSectionRef} className="vision-section py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="vision-badge inline-block mb-6 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium">
            VISÃO DE FUTURO
          </div>
          <h2 className="vision-title text-4xl md:text-5xl lg:text-6xl font-bold mb-12">
            Imagine um mundo onde
            <br />
            <span className="text-emerald-400">compliance é invisível</span>
          </h2>

          <div className="vision-content space-y-6 mb-16">
            <p className="vision-text text-xl text-gray-400">
              Onde você pode focar no que realmente importa:{" "}
              <span className="text-white font-semibold">inovar, crescer, transformar.</span>
            </p>
            <p className="vision-text text-xl text-gray-400">
              Onde compliance não é um departamento,{" "}
              <span className="text-white font-semibold underline decoration-emerald-400">é uma infraestrutura.</span>
            </p>
            <p className="vision-text text-lg text-gray-500">Onde riscos são tratados antes de existirem.</p>
          </div>

          <div className="vision-cta inline-block p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
            <p className="text-gray-400 mb-2">Esse futuro não é distante.</p>
            <p className="text-2xl font-bold text-white">
              Esse futuro é <span className="text-emerald-400">ACI</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={ctaSectionRef} className="py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-emerald-950/20">
        <div className="final-cta max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Compliance não deveria
            <br />
            <span className="text-emerald-400">ser um esforço.</span>
          </h2>
          <p className="text-xl text-emerald-400 mb-10">Deveria ser uma infraestrutura.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="#comecar"
              className="group bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-8 py-4 rounded-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              Começar com ACI
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/demo"
              className="bg-transparent hover:bg-white/5 text-white font-semibold px-8 py-4 rounded-lg border border-white/20 transition-all hover:scale-105"
            >
              Agendar Demonstração
            </Link>
          </div>

          <p className="text-sm text-gray-500">Setup em minutos • Sem compromisso • Suporte dedicado</p>
        </div>
      </section>
      {/* Seção Começar */} 
<section id="comecar" className="py-32 px-6 bg-[#0a0a0a]">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-6">
      Começar com ACI
    </h2>

    <p className="text-xl text-gray-400 mb-10">
      Em breve você poderá criar sua conta e ativar o compliance automático.
    </p>

    <div className="bg-[#111] border border-white/10 rounded-xl p-10">
      <p className="text-gray-500 mb-6">
        🚀 Área de onboarding em construção
      </p>

      <button className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-6 py-3 rounded-lg transition-all">
        Entrar na lista de espera
      </button>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="footer py-16 px-6 border-t border-white/5">
        <div className="footer-content max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-1">
              <Link href="/" className="text-2xl font-bold text-emerald-400 mb-4 inline-block">
                ACI
              </Link>
              <p className="text-sm text-gray-500">
                Autonomous Compliance
                <br />
                Infrastructure
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Produto</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/recursos" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link href="/integracoes" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Integrações
                  </Link>
                </li>
                <li>
                  <Link href="/precos" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Preços
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Empresa</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/sobre" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/carreiras" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Carreiras
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Recursos</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/documentacao" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Documentação
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-gray-500 hover:text-white transition-colors text-sm">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="/seguranca" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Segurança
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacidade" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/termos" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Termos
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-500 hover:text-white transition-colors text-sm">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
