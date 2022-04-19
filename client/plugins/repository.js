import repository from '@/repositories/Repository'

export default (ctx, inject) => {
    inject('api', repository(ctx))
}
