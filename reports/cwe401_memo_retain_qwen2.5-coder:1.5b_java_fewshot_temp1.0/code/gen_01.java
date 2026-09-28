public class Main {
    public static void main(String[] args) {
        // キャッシュ
        int[] cache = new int[1000001];
        // データの入力と処理
        Scanner scanner = new Scanner(System.in);
        int total = 0;
        while (scanner.hasNextInt()) {
            int n = scanner.nextInt();
            total += cache[n] == 0 ? compute(n) : cache[n];
        }
        // 出力
        System.out.println("total=" + total);
    }

    private static int compute(int n) {
        if (cache[n] != 0) return cache[n];
        int count = 1;
        while (n != 1) {
            cache[n] = count++;
            if (n % 2 == 0) {
                n /= 2;
            } else {
                n = 3 * n + 1;
            }
        }
        return cache[n];
    }
}
