import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-orange-500 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться назад
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Политика конфиденциальности</h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Общие положения</h2>
            <p>
              Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Какие данные мы собираем</h2>
            <p>
              Мы можем собирать следующую информацию:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Номер телефона</li>
              <li>Ответы на вопросы квиза (предпочтения по дизайну, материалам и т.д.)</li>
              <li>Комментарии, оставленные пользователем</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Цели сбора данных</h2>
            <p>
              Ваши данные используются исключительно для:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Предварительного расчета стоимости кухонного гарнитура</li>
              <li>Связи с вами для предоставления консультации</li>
              <li>Предоставления обещанного подарка по результатам прохождения опроса</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Защита данных</h2>
            <p>
              Мы принимаем необходимые организационные и технические меры для защиты персональной информации пользователя от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Согласие пользователя</h2>
            <p>
              Оставляя данные в форме обратной связи и нажимая кнопку «Получить расчёт», вы автоматически соглашаетесь с данной Политикой конфиденциальности.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Изменения политики</h2>
            <p>
              Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности в любое время без предварительного уведомления.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <Link to="/">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors">
              Понятно, вернуться к квизу
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
