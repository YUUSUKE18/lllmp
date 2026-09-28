import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        int target = Integer.parseInt(System.in);
        List<Integer> numbers = Arrays.stream(System.in.skip(1).toArray()).collect(Collectors.toList());

        int count = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
